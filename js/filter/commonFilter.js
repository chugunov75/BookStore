class CommonFilter {
  constructor(options) {

    options = Object.assign({
      products: null,
      // parent: document.body,
      units: 'грн.',
      minPrice: 0,
      maxPrice: 0,
      subcategoriesList: null,
      callback: function () {}
    }, options);

    this.instance = BaseFilter.createElem('form', 'common-filter', options.parent);
    this.products = options.products;
    this.callback = options.callback;

    /*обработчик событий изменения состояния вмещаемых фильтров; инициализируется в методе setHandlers()*/
    this.onItemStateChangeCallback;

    /*usingDefaultValues - индикатор, показывающий, используются ли значения по умолчанию или значения из локального хранилища при инициализации фильтров*/
    let usingDefaultValues = false;

    /*----------инициализация вмещаемых фильтров----------*/
    let opt = {
      btnId: 'filter1',
      title: 'Цена',
      rangeUnits: 'грн.',
      parent: this.instance,
      minValue: options.minPrice,
      maxValue: options.maxPrice,
      step: 1
    };

    if (sessionStorage.getItem('minPrice')) {
      opt.startValue = parseFloat(sessionStorage.getItem('minPrice'));
      opt.endValue = parseFloat(sessionStorage.getItem('maxPrice'));
      usingDefaultValues = true;
    }

    let _range = new RangeFilter(opt);

    _range.onStateChangeCallback = () => {
      this.onItemStateChangeCallback();
    };

    let choosenValues = sessionStorage.getItem('subCategories');
    if (choosenValues) {
      choosenValues = JSON.parse(choosenValues);
      usingDefaultValues = true;
    }

    opt = {
      dataList: options.subcategoriesList,
      btnId: 'filter2',
      title: 'Подкатегории',
      parent: this.instance,
      choosenValues: choosenValues || null
    };

    let _subcategoryFilter = new CheckboxFilter(opt);

    _subcategoryFilter.onStateChangeCallback = () => {
      this.onItemStateChangeCallback();
    };

    this._reset = function () {
      _range.reset();
      _subcategoryFilter.reset();
    };

    /*объявление методов доступа к публичным полям вмещаемх фильтров;
  при обращении к соответствующему свойству его значение записывается в sessionStorage с тем же ключем, что и имя свойства*/
    Object.defineProperties(this, {
      'minPrice': {
        get: function () {
          return parseFloat(_range.startValueField.value);
        }
      },
      'maxPrice': {
        get: function () {
          return parseFloat(_range.endValueField.value);
        }
      },
      'subCategories': {
        get: function () {
          return _subcategoryFilter.choosenValues;
        }
      }

    });

    let btnContainer = BaseFilter.createElem('div', 'filter-btn-container', this.instance);

    let buttons = [{ propName: 'btnSend', text: 'применить', className: 'btn btn-bordered', type: 'button', disabled: true }, { propName: 'btnReset', text: 'сбросить', className: 'btn btn-bordered', type: 'button', disabled: true }];

    for (let i = 0; i < buttons.length; i++) {
      this[buttons[i].propName] = BaseFilter.createElem('button', buttons[i].className, btnContainer);
      this[buttons[i].propName].type = buttons[i].type;
      this[buttons[i].propName].textContent = buttons[i].text;
      this[buttons[i].propName].disabled = buttons[i].disabled;
    }

    this.instance.parentElement.style.height = this.instance.offsetHeight + 'px';

    this.setHandlers();
    if (usingDefaultValues) {
      this.btnSend.dispatchEvent(new Event('click'));
    }
  }
  saveFilterState(){
    sessionStorage.setItem('maxPrice', this.maxPrice);
    sessionStorage.setItem('minPrice', this.minPrice);
    sessionStorage.setItem('subCategories', JSON.stringify(this.subCategories));
  }
  setHandlers() {
    let self = this;
    this.btnSend.addEventListener('click', function (e) {
      self.filterProducts();
      self.saveFilterState();
      e.currentTarget.disabled = true;
      self.btnReset.disabled = false;
    });
    this.btnReset.addEventListener('click', function (e) {
      e.currentTarget.disabled = true;
      self.reset();
      self.btnSend.disabled = true;
    });
    /*обработчик событий изменения состояний вмещаемых фильтров */
    this.onItemStateChangeCallback = () => {
      if (this.btnSend.disabled) {
        this.btnSend.disabled = false;
      }
      if (!this.btnReset.disabled) {
        self.btnReset.disabled = true;
      }
    };
    this.instance.parentElement.previousElementSibling.addEventListener('click', function (e) {
      if (self.instance.parentElement.offsetHeight == 0) {
        self.instance.parentElement.style.height = self.instance.offsetHeight + 'px';
      } else {
        self.instance.parentElement.style.height = 0;
      }
    });
  }
  /*фильтрует массив исходных данных в соответствии с текущими состояниями вмещаемых фильтров 
 и вызывает функцию-подписчик из внешнего кода с отфильтрованным массивом данных*/
  filterProducts() {

    let products = CommonFilter.filterByPrice(this.products, this.minPrice, this.maxPrice);
    products = CommonFilter.filterByCategory(products, this.subCategories);
    if (products.length > 0) {
      this.callback(products);
    } else {
      let confirmMsg = new ConfirmMessagebox({
        message: 'Книг с заданными параметрами не найдено. Сбросить фильтры?',
        onCloseCallback: result => {
          if (result) {
            this.reset();
          } else {
            this.callback(products);
          }
        }
      });
    }
  }
  /*метод reset() сбрасывает фильтры в исходное состояние и удаляет данные о состоянии фильтров из локального хранилища*/
  reset() {
    this._reset();
    this.filterProducts();
    sessionStorage.removeItem('minPrice');
    sessionStorage.removeItem('maxPrice');
    sessionStorage.removeItem('subCategories');
  }
  /*функции для филльтрации исходных данных по соответствующим показателям*/
  static filterByPrice(products, min, max) {
    let result = [];
    for (let i = 0; i < products.length; i++) {
      if (parseFloat(products[i].price) >= min && parseFloat(products[i].price) <= max) {
        result.push(products[i]);
      }
    }
    return result;
  }
  static filterByCategory(products, categories) {
    let result = [];
    for (let i = 0; i < products.length; i++) {
      for (let j = 0; j < categories.length; j++) {
        if (products[i].category == categories[j]) {
          result.push(products[i]);
          break;
        }
      }
    }
    return result;
  }

}