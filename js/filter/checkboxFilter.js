class CheckboxFilter extends BaseFilter {
  constructor(options) {
    options = Object.assign({
      /*dataList - массив объектов, содержащих имена свойств и их текстовые представления для формирования списка чекбоксов*/
      dataList: null,
      /*choosenValues - массив имен выбранных чекбоксов*/
      choosenValues: null
    }, options);

    // if(!options.dataList){
    //  return null;
    // }

    super(options);
  }

  init(options) {
    super.init(options);

    /*--------------массив для хранения имён текущих выбранных чекбоксов*/

    let _choosenValues = options.choosenValues ? options.choosenValues : [];
    let initWithChoosenValues = _choosenValues.length > 0;
    Object.defineProperty(this, 'choosenValues', {
      get: function () {
        return _choosenValues;
      }
    });

    for (let i = 0; i < options.dataList.length; i++) {
      let label = BaseFilter.createElem('label', '', this.controlsContainer);
      let input = BaseFilter.createElem('input', '', label);
      input.type = 'checkbox';
      input.name = options.dataList[i].name;
      label.appendChild(document.createTextNode(options.dataList[i].text));

      if (!initWithChoosenValues) {
        input.checked = true;
        _choosenValues.push(options.dataList[i].name);
      } else {
        input.checked = ~_choosenValues.indexOf(input.name);
      }
    }
  }

  setHandlers() {
    super.setHandlers();

    let self = this;

    let checkboxes = this.getCheckboxes();
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].addEventListener('change', function (e) {
        self.changeChoosenValues(e.currentTarget);
      });
    }
  }
  /*метод changeChoosenValues вызывается при изменеии состояния чекбоксов; в качестве аргумента принимает изменивший состояние чекбокс*/
  changeChoosenValues(choosenCheckbox) {
    if (choosenCheckbox.checked) {
      this.choosenValues.push(choosenCheckbox.name);
    } else {
      let index = this.choosenValues.indexOf(choosenCheckbox.name);
      this.choosenValues.splice(index, 1);
    }
    this.onStateChangeCallback();
  }

  reset() {
    let checkboxes = this.getCheckboxes();
    this.choosenValues.length = 0;
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = true;
      this.choosenValues.push(checkboxes[i].name);
    }
  }

  getCheckboxes() {
    return this.controlsContainer.querySelectorAll('input[type="checkbox"]');
  }

}