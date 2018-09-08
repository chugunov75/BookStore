class RangeFilter extends BaseFilter {
  constructor(options) {

    options = Object.assign({
      /*-----options for baseFilter class----------------*/
      // btnId: 'filter1',
      // title: 'title',
      // parent: document.body,
      /*-----options for rangeFilter class----------------*/
      rangeUnits: 'грн.',
      /*-----options for range class----------------*/
      rangeClassName: 'range-axis',
      tagName: 'div',
      sliderClassName: 'range-slider',
      minValue: 0,
      maxValue: 0,
      step: 1
    }, options);

    super(options);

    /*-------------ссылки на элементы input, содержащие соответствующие значения диапазона, создаются в методе init(options)--------------
     this.startValueField;
     this.endValueField;
    */

    /*-----------ссылка на экземпляр класса Range, обеспечивающего работу ползунка, создается в методе init(options)-------
     this.range;
    */

  }
  init(options) {
    super.init(options);

    let container = BaseFilter.createElem('div', 'range-input-container', this.controlsContainer);

    let controls = [{ labelText: 'от', inputPropName: 'startValueField', inputName: 'startValue', value: options.minValue }, 
    { labelText: 'до', inputPropName: 'endValueField', inputName: 'endValue', value: options.maxValue }];
    
    for (let i = 0; i < controls.length; i++) {
      let label = BaseFilter.createElem('label', '', container);
      this[controls[i].inputPropName] = BaseFilter.createElem('input', '', label);
      this[controls[i].inputPropName].step = options.step;
      this[controls[i].inputPropName].min = options.minValue;
      this[controls[i].inputPropName].max = options.maxValue;
      this[controls[i].inputPropName].type = 'number';
      this[controls[i].inputPropName].name = controls[i].inputName;
      this[controls[i].inputPropName].value = controls[i].value;

      let text = `${controls[i].labelText}, ${options.rangeUnits}`;
      label.insertBefore(document.createTextNode(text), this[controls[i].inputPropName]);
    }

    let opt = {
      parent: this.controlsContainer,
      minValue: options.minValue,
      maxValue: options.maxValue,
      step: options.step
    };

    this.range = new Range(opt);
/*значения startValue и endValue объекта настроек, если заданы, позволяют установить ползунки в произвольном положении внутри диапазона,
 заданного значениями minValue и maxValue; если не заданы - ползунки устанавливаются в крайние положения;*/
    if ('startValue' in options) {
      let value = parseFloat(options.startValue);
      if (!isNaN(value) && value >= this.range.startValue && value <= this.range.endValue) {
        this.range.leftValue = value;
        this.startValueField.value = value;
      }
    }
    if ('endValue' in options) {
      let value = parseFloat(options.endValue);
      if (!isNaN(value) && value >= this.range.startValue && value <= this.range.endValue) {
        this.range.rightValue = value;
        this.endValueField.value = value;
      }
    }
  }
  setHandlers() {
    super.setHandlers();
    let self = this;
    /*------установка обработчиков, изменяющих значения полей ввода при передвижение ползунков----------*/
    this.range.leftSliderMoveCallback = function (val) {
      self.startValueField.value = val;
      self.onStateChangeCallback();
    };
    this.range.rightSliderMoveCallback = function (val) {
      self.endValueField.value = val;
      self.onStateChangeCallback();
    };

    /*------установка обработчиков, изменяющих положение ползунков при изменении значений полей ввода ---------*/

    this.startValueField.addEventListener('input', function (e) {
      let value = parseFloat(e.currentTarget.value);
      if (!isNaN(value) && value >= self.range.startValue && value <= self.range.endValue) {
        self.range.leftValue = value;
      }
    });

    this.endValueField.addEventListener('input', function (e) {
      let value = parseFloat(e.currentTarget.value);
      if (!isNaN(value) && value >= self.range.startValue && value <= self.range.endValue) {
        self.range.rightValue = value;
      }
    });
  }
  reset() {
    this.range.reset();
  }
}