class Cart {
  constructor(options) {

    options = Object.assign({
      parent: null
    }, options);
    /*заказанные продукты в виде массива объектов типа CartLine*/
    this.lines = null;

    /*визуальный элемент корзины*/
    this.cartLabel = null;
    /*элемент для визуализации суммы заказа*/
    this.cartValueContainer = null;
    /*кнопка-значек для вызова окна корзины*/
    this.btnShowCart = null;
    /*кнопка-значек для очистки корзины*/
    this.btnEmptyCart = null;

    this.init(options);
    this.setHandlers();
  }
  init(options) {

    this.cartLabel = Popup.createElem('div', 'cart-label', options.parent);
    this.btnEmptyCart = Popup.createElem('button', 'btn cart-btn hidden', this.cartLabel);
    this.cartValueContainer = Popup.createElem('p', '', this.cartLabel);
    this.cartValueContainer.textContent = 0;
    this.btnShowCart = Popup.createElem('button', 'btn cart-btn', this.cartLabel);
    this.btnShowCart.disabled = true;

    this.lines = Cart.getCartLines();

    if (this.lines.length > 0) {
      this.changeCartValue();
      this.btnShowCart.disabled = false;
    }
  }

  setHandlers() {
    let self = this;
    this.btnEmptyCart.addEventListener('click', function (e) {
      self.onBtnEmptyClickHandler();
    });
    this.btnShowCart.addEventListener('click', function (e) {
      self.showCart();
    });
  }
  /*метод добавления продукта в корзину; принимает в качестве аргумента объект, описывающий продукт;
  если подукта в корзине нет - создаётся новая запись, иначе - лишь увеличивается количество*/
  addProduct(product) {
    var cartLine = this.findCartLine(product.id).cartLine;
    if (cartLine) {
      cartLine.LineQuantity++;
    } else {
      this.lines.push(new CartLine({
        ProductId: product.id,
        ProductInfo: DataManager.getProductInfo(product),
        ProductPrice: product.price,
        LineQuantity: 1
      }));
    }
    this.changeCartValue();
    this.saveCart();
  }
  /*метод, изменяющий количество заказанного товара; в качестве параметра принимает идентификатор продукта и новое значение колличества*/
  changeLineQuantity(productId, quantity) {
    var cartLine = this.findCartLine(productId).cartLine;
    if (cartLine) {
      cartLine.LineQuantity = quantity;
      this.changeCartValue();
      this.saveCart();
    }
  }
  /*метод поиска записи в корзине по Id продукта*/
  findCartLine(productId) {
    let result = {
      cartLine: null,
      index: -1
    };
    for (let i = 0; i < this.lines.length; i++) {
      if (this.lines[i].ProductId == productId) {
        result.cartLine = this.lines[i];
        result.index = i;
        break;
      }
    }
    return result;
  }
  /*метод удаления продукта из корзины; принимает в качестве аргумента Id продукта*/
  removeProduct(productId) {
    let cartLineIndex = this.findCartLine(productId).index;
    if (~cartLineIndex) {
      this.lines.splice(cartLineIndex, 1);
      this.changeCartValue();
      this.saveCart();
    }
  }
  /*метод очистки корзины*/
  clear() {
    this.lines = [];
    sessionStorage.removeItem('cart');
    this.changeCartValue();
  }
  /*метод, возвращающий общую сумму заказа*/
  getTotalAmount() {
    let result = 0;
    for (let i = 0; i < this.lines.length; i++) {
      result += this.lines[i].getLineCost();
    }
    return result;
  }
  /*метод, визуализирующий текущую сумму заказа*/
  changeCartValue() {
    var value = this.getTotalAmount();
    var units = '';
    if (value > 0) {
      units = 'грн.';
      if (this.btnEmptyCart.classList.contains('hidden')) {
        this.btnEmptyCart.classList.remove('hidden');
      }
      this.btnShowCart.disabled = false;
    } else if (value == 0) {
      this.btnShowCart.disabled = true;
      if (!this.btnEmptyCart.classList.contains('hidden')) {
        this.btnEmptyCart.classList.add('hidden');
      }
    }
    this.cartValueContainer.textContent = `${value} ${units}`;
  }
  /*метод, сохраняющий текущее содержимое корзины в локальном хранилище*/
  saveCart() {
    sessionStorage.removeItem('cart');
    sessionStorage.setItem('cart', JSON.stringify(this.lines));
  }
  /*метод вызова модального окна с информацией о заказе*/
  showCart() {
    let options = Object.create(null);
    options.title = 'Ваш заказ:';
    options.cart = this;
    options.className = 'animated bounceInDown';
    return new CartPopup(options);
  }
  /*метод-обработчик очистки корзины; аналогично вызывается модальное окно для подтверждения действия и при положительном ответе запись удаляется,
   иначе сохраняется предыущее значение*/
  onBtnEmptyClickHandler() {
    let self = this;

    new ConfirmMessagebox({
      message: 'Вы действительно хотите очистить корзину?',
      className: 'animated bounceInDown',
      onCloseCallback: function (result) {
        if (result) {
          self.clear();
        }
      }
    });
  }
  /*статический метод, извлекающий данные корзины из локального хранилища*/
  static getCartLines() {
    let lines = [];

    let temp = sessionStorage.getItem('cart');
    if (temp) {
      temp = JSON.parse(temp);
      for (let i = 0; i < temp.length; i++) {
        lines.push(new CartLine(temp[i]));
      }
    }

    return lines;
  }

}