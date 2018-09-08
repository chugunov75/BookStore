class DraggableBlock {
  constructor(opt) {

    opt = Object.assign({
      parent: null,
      className: '',
      tagName: 'div'
    }, opt);

    this.instance = document.createElement(opt.tagName);
    if (opt.className) {
      this.instance.className = opt.className;
    }
    if (opt.parent) {
      opt.parent.appendChild(this.instance);
    }

    let _posX = 0;
    let _posY = 0;
    let _captured = false;
    let _dx = 0;
    let _dy = 0;

    /*свойства для установки функций обратного вызова из внешнего кода; вызываются при перемещении соответствующего блока*/
    this.onMoveX = function () {};
    this.onMoveY = function () {};

    /*координаты относительно родителя*/
    Object.defineProperties(this, {
      left: {
        get: function () {
          return _posX;
        },
        set: function (value) {
          _posX = value;
          this.instance.style.left = _posX + 'px';
          this.onMoveX();
        }
      },
      top: {
        get: function () {
          return _posY;
        },
        set: function (value) {
          _posY = value;
          this.instance.style.top = _posY + 'px';
          this.onMoveY();
        }
      },
      right: {
        get: function () {
          return _posX + this.instance.offsetWidth;
        },
        set: function (value) {
          _posX = value - this.instance.offsetWidth;
          this.instance.style.left = _posX + 'px';
          this.onMoveX();
        }
      },
      bottom: {
        get: function () {
          return _posY + this.instance.offsetHeight;
        },
        set: function (value) {
          _posY = value - this.instance.offsetHeight;
          this.instance.style.top = _posY + 'px';
          this.onMoveY();
        }
      }
    });
    /*координаты относительно документа*/
    Object.defineProperties(this, {
      pageX: {
        get: function () {
          return this.instance.getBoundingClientRect().left + pageXOffset;
        }
      },
      pageY: {
        get: function () {
          return this.instance.getBoundingClientRect().top + pageYOffset;
        }
      }
    });
    /*свойства, необходимые для перемещения блока*/
    Object.defineProperties(this, {
      captured: {
        get: function () {
          return _captured;
        },
        set: function (value) {
          if (!_captured && value) {
            _captured = true;
            this.instance.style.zIndex = 1000;
            this.instance.style.position = 'absolute';
          } else if (_captured && !value) {
            _captured = false;
            this.instance.style.zIndex = '';
            this.instance.style.position = '';
            _dx = 0;
            _dy = 0;
          }
        }
      },
      dX: {
        get: function () {
          return _dx;
        },
        set: function (value) {
          _dx = value;
        }
      },
      dY: {
        get: function () {
          return _dy;
        },
        set: function (value) {
          _dy = value;
        }
      }
    });
  }
  /*методы рассчёта смещения блока относительно текущего положения при движении мыши; 
 в качестве аргумента принимают соответствующую координату курсора относительно документа*/
  shiftX(mousePageX) {
    return mousePageX - this.pageX - this.dX;
  }
  shiftY(mousePageY) {
    return mousePageY - this.pageY - this.dY;
  }
  /*метод установки смещения курсора относительно левого верхнего угла блока при его захвате;
 в качестве аргументов принимает соответствующие координаты курсора относительно документа*/
  setMouseOffset(mousePageX, mousePageY) {
    this.dX = mousePageX - this.pageX;
    this.dY = mousePageY - this.pageY;
  }

}