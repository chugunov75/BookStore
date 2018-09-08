class BaseFilter {

  constructor(options) {

    options = Object.assign({
      btnId: 'filter1',
      title: 'title',
      parent: document.body
    }, options);

    this.instance;
    this.btnExpand;
    this.controlsContainer;

    /*-----------функция обратного вызова, срабатывающая при любом изменении значений диапазона; предназначена для использования в производных классах-------*/
    this.onStateChangeCallback = function () {};

    this.init(options);
    this.controlsContainer.parentElement.style.height = this.controlsContainer.offsetHeight + 'px';
    this.setHandlers();
  }

  init(options) {
    this.instance = BaseFilter.createElem('div', 'filter');
    let elem = null;
    elem = BaseFilter.createElem('input', 'filter-control-expand', this.instance);

    elem.type = 'checkbox';
    elem.id = options.btnId;

    this.btnExpand = BaseFilter.createElem('label', 'filter-btn-expand', this.instance);
    this.btnExpand.htmlFor = options.btnId;

    elem = BaseFilter.createElem('h6', 'filter-title', this.instance);
    elem.textContent = options.title;
    elem = BaseFilter.createElem('div', 'filter-controls-wrap', this.instance);
    this.controlsContainer = BaseFilter.createElem('div', 'filter-controls-container', elem);

    if (options.parent) {
      options.parent.appendChild(this.instance);
    }
  }
  setHandlers() {
    let self = this;

    this.btnExpand.addEventListener('click', function (e) {
      if (self.controlsContainer.parentElement.offsetHeight == 0) {
        self.controlsContainer.parentElement.style.height = self.controlsContainer.offsetHeight + 'px';
      } else {

        self.controlsContainer.parentElement.style.height = 0;
      }
    });
  }
  /*условно-абстрактный метод, должен быть реализован в производных классах */
  reset() {}

  static createElem(tagName, className, parent = null, nextNode = null) {
    let element = document.createElement(tagName);
    if (className) {
      element.className = className;
    }
    if (parent) {
      parent.insertBefore(element, nextNode);
    }
    return element;
  }
}