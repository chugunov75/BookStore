class Range {

  constructor(opt) {

    opt = Object.assign({
      parent: null,
      rangeClassName: 'range-axis',
      tagName: 'div',
      sliderClassName: 'range-slider',
      minValue: 0,
      maxValue: 0,
      step: 1,
      onMoveLeftSlider: function () {},
      onMoveRightSlider: function () {}
    }, opt);

    opt.minValue = opt.minValue < 0 ? 0 : opt.minValue;
    opt.maxValue = opt.maxValue < 0 ? 0 : opt.maxValue;
    if (opt.minValue > opt.maxValue) {
      let temp = opt.minValue;
      opt.minValue = opt.maxValue;
      opt.maxValue = temp;
    }

    /*---------необходимо для реализации возможности работы с дробными числами*/
    let _counter = 1;
    let _step = opt.step;
    if (_step < 1) {
      while (_step < 1 || _step > parseInt(_step)) {
        _counter *= 10;
        _step *= 10;
      }
    }

    let _startValue = opt.minValue * _counter;
    let _endValue = opt.maxValue * _counter;
    let _leftValue = opt.minValue * _counter;
    let _rightValue = opt.maxValue * _counter;

    this.draggable = null;

    this.instance = document.createElement(opt.tagName);
    if (opt.rangeClassName) {
      this.instance.className = opt.rangeClassName;
    }
    if (opt.parent) {
      opt.parent.appendChild(this.instance);
    }
    /*свойства для установки внешних функций-обработчиков; функции принимают один параметр - смещение ползунка в единицах  диапазона*/
    this.leftSliderMoveCallback = opt.onMoveLeftSlider;
    this.rightSliderMoveCallback = opt.onMoveRightSlider;

    this.leftSlider = new DraggableBlock({ parent: this.instance, className: opt.sliderClassName });
    this.leftSlider.right = 0;

    this.rightSlider = new DraggableBlock({ parent: this.instance, className: opt.sliderClassName });
    this.rightSlider.left = this.instance.clientWidth;

    /*setValueOnGetter и setValueOnSetter вспомогательные методы */
    let setValueOnGetter = (value, sliderBound) => {
      // let currentVal=Math.floor((_endValue-_startValue)*(this.leftSlider.right/this.instance.clientWidth));
      // let currentVal=Math.ceil((_endValue-_startValue)*(this.rightSlider.left/this.instance.clientWidth));
      let currentVal = (_endValue - _startValue) * (sliderBound / this.instance.clientWidth) + _startValue;
      /*поведение в близи границ диапазона, если _step не кратен диапазону*/
      if (currentVal == _startValue) {
        value = _startValue;
      } else if (currentVal == _endValue) {
        value = _endValue;
      } else {
        let dir = currentVal - value > 0 ? 1 : -1;
        let n = Math.floor(Math.abs(currentVal - value) / _step);
        if (n >= 1) {
          value = value + dir * n * _step;
        }
      }
      return value;
    };

    let setValueOnSetter = newValue => {
      newValue *= _counter;
      if (newValue > _endValue) {
        newValue = _endValue;
      } else if (newValue < _startValue) {
        newValue = _startValue;
      }

      return newValue;
    };
    /*leftValue и rightValue - методы чтения/установки текущих значений  в единицах диапазона;
  startValue и endValue начальное и конечное значения диапазона; counter - свойство, необходимое для работы с дробными числами*/
    Object.defineProperties(this, {
      leftValue: {
        get: function () {
          _leftValue = setValueOnGetter(_leftValue, this.leftSlider.right);
          return _leftValue / _counter;
        },
        set: function (value) {
          _leftValue = setValueOnSetter(value);
          this.leftSlider.right = (_leftValue - _startValue) * this.instance.clientWidth / (_endValue - _startValue);
        }
      },
      rightValue: {
        get: function () {
          _rightValue = setValueOnGetter(_rightValue, this.rightSlider.left);
          return _rightValue / _counter;
        },
        set: function (value) {
          _rightValue = setValueOnSetter(value);
          this.rightSlider.left = (_rightValue - _startValue) * this.instance.clientWidth / (_endValue - _startValue);
        }
      },
      startValue: {
        get: function () {
          return _startValue / _counter;
        }
      },
      endValue: {
        get: function () {
          return _endValue / _counter;
        }
      },
      counter: {
        get: function () {
          return _counter;
        }
      }
    });

    this.setHandlers();
  }

  setHandlers() {
    let self = this;

    self.leftSlider.onMoveX = function () {
      self.leftSliderMoveCallback(self.leftValue);
      if (self.leftSlider.right > self.rightSlider.left) {
        self.rightSlider.left = self.leftSlider.right;
      }
    };
    self.rightSlider.onMoveX = function () {
      self.rightSliderMoveCallback(self.rightValue);
      if (self.rightSlider.left < self.leftSlider.right) {
        self.leftSlider.right = self.rightSlider.left;
      }
    };
    /*функция, выполняющая подготовку подзунка к перемещению; в качестве параметра принимает объект события*/
    function captureSlider(event) {

      if (!self.draggable) {

        if (event.currentTarget == self.rightSlider.instance) {
          self.draggable = self.rightSlider;
        } else if (event.currentTarget == self.leftSlider.instance) {
          self.draggable = self.leftSlider;
        }
        self.draggable.captured = true;
        self.draggable.setMouseOffset(event.pageX, event.pageY);
      }
    }
    /*функция, выполняющая передвижение подзунка; в качестве параметра принимает объект события*/
    function moveSlider(event) {
      if (self.draggable) {
        event.preventDefault();

        if (self.draggable == self.leftSlider) {
          if (self.draggable.right + self.draggable.shiftX(event.pageX) <= 0) {
            if (self.draggable.right > 0) {
              self.draggable.right = 0;
            }
          } else if (self.draggable.right + self.draggable.shiftX(event.pageX) >= self.instance.clientWidth) {
            if (self.draggable.right < self.instance.clientWidth) {
              self.draggable.right = self.instance.clientWidth;
            }
          } else {
            self.draggable.left = self.draggable.left + self.draggable.shiftX(event.pageX);
          }
        } else {
          if (self.draggable.left + self.draggable.shiftX(event.pageX) <= 0) {
            if (self.draggable.left > 0) {
              self.draggable.left = 0;
            }
          } else if (self.draggable.left + self.draggable.shiftX(event.pageX) >= self.instance.clientWidth) {
            if (self.draggable.left < self.instance.clientWidth) {
              self.draggable.left = self.instance.clientWidth;
            }
          } else {
            self.draggable.left = self.draggable.left + self.draggable.shiftX(event.pageX);
          }
        }
      }
    }
    function releaseSlider() {
      if (self.draggable) {
        self.draggable.captured = false;
        self.draggable = null;
      }
    }
    self.leftSlider.instance.addEventListener('mousedown', captureSlider);
    self.rightSlider.instance.addEventListener('mousedown', captureSlider);
    document.addEventListener('mousemove', moveSlider);
    document.addEventListener('mouseup', releaseSlider);
  }
  reset() {
    this.leftValue = this.startValue;
    this.rightValue = this.endValue;
  }
}