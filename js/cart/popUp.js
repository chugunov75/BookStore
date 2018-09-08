class Popup {
  constructor(options) {

    options = Object.assign({
      title: 'title',
      width: '',
      className: '',
      parent: null,
      content: null,
      onCloseCallback: function () {}

    }, options);

    let _removeOverlayOnClose = false;

    if (!options.parent) {
      options.parent = Popup.getOverlay();
      _removeOverlayOnClose = true;
    }

    Object.defineProperty(this, 'removeOverlayOnClose', {
      get: function () {
        return _removeOverlayOnClose;
      }
    });

    this.additionClassName = options.className;

    this.instance = null;

    this.btnClose = null;

    this.onCloseCallback = options.onCloseCallback;

    this.init(options);
    this.setHandlers();
  }

  init(options) {

    this.instance = Popup.createElem('div', options.className);
    this.instance.classList.add('popup');
    this.instance.style.maxWidth = options.width;
    this.instance.setAttribute('tabindex', 0);
    let title = Popup.createElem('div', 'popup-title', this.instance);
    Popup.createElem('h4', '', title).textContent = options.title;
    this.btnClose = Popup.createElem('div', 'popup-btn-close', title);
    let container = Popup.createElem('div', 'popup-container', this.instance);
    if (options.content) {
      container.appendChild(options.content);
    }
    if (options.parent) {
      options.parent.appendChild(this.instance);
    }
    this.instance.focus();
  }

  setHandlers() {
    let self = this;
    this.btnClose.addEventListener('click', function (e) {
      self.close();
    });

    function escapeKeydownHandler(event) {
      if (event.keyCode == 27) {
        self.close();
        // event.currentTarget.removeEventListener('keydown',escapeKeydownHandler);
      }
    }

    this.instance.addEventListener('keydown', function (e) {
      if (e.keyCode == 27) {
        self.close();
      }
    });
  }

  close() {
    if (this.removeOverlayOnClose) {
      let overlay = this.instance.parentElement;
      overlay.parentElement.removeChild(overlay);
    } else {
      this.instance.parentElement.removeChild(this.instance);
    }
    this.onCloseCallback();
  }

  static getOverlay() {

    return Popup.createElem('div', 'overlay', document.body);
  }

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