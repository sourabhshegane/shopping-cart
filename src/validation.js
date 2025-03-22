export class CartValidator {
  static validateItem(item) {
    if (!PRICE_CATALOG[item]) {
      throw new CartError(`Invalid product: ${item}`);
    }
  }

  static validateQuantity(quantity) {
    if (quantity < 0 || !Number.isInteger(quantity)) {
      throw new CartError(`Invalid quantity: ${quantity}`);
    }
  }
}

export class CartError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CartError';
  }
}