class CartLine {
  constructor(options) {

    Object.assign({
      ProductId: 0,
      ProductInfo: '',
      ProductPrice: 0,
      LineQuantity: 0
    }, options);

    Object.defineProperties(this, {
      'ProductId': {
        value: parseInt(options.ProductId),
        writable: false,
        configurable: false,
        enumerable: true
      },
      'ProductInfo': {
        value: options.ProductInfo,
        writable: false,
        configurable: false,
        enumerable: true
      },
      'ProductPrice': {
        value: parseFloat(options.ProductPrice),
        writable: false,
        configurable: false,
        enumerable: true
      },
      'LineQuantity': {
        value: parseInt(options.LineQuantity),
        writable: true,
        configurable: false,
        enumerable: true
      }
    });
  }
  getLineCost() {
    return this.ProductPrice * this.LineQuantity;
  }
}