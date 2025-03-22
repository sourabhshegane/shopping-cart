export class PricingStrategy {
  calculate(quantity, unitPrice) { throw new Error('calculate() must be implemented'); }
  getDescription() { throw new Error('getDescription() must be implemented'); }
}

export class RegularPricing extends PricingStrategy {
  calculate(quantity, unitPrice) {
    return quantity * unitPrice;
  }

  getDescription() {
    return "Regular pricing";
  }
}

export class BuyOneGetOneFree extends PricingStrategy {
  calculate(quantity, unitPrice) {
    return Math.ceil(quantity / 2) * unitPrice;
  }

  getDescription() {
    return "Buy One Get One Free";
  }
}

export class ThreeForTwo extends PricingStrategy {
  calculate(quantity, unitPrice) {
    return Math.ceil(quantity * 2 / 3) * unitPrice;
  }

  getDescription() {
    return "3 for the price of 2";
  }
}

export class BulkDiscount extends PricingStrategy {
  constructor(threshold, discountPercentage) {
    super();
    this.threshold = threshold;
    this.discountPercentage = discountPercentage;
  }

  calculate(quantity, unitPrice) {
    if (quantity >= this.threshold) {
      return quantity * unitPrice * (1 - this.discountPercentage);
    }
    return quantity * unitPrice;
  }

  getDescription() {
    return `${this.discountPercentage * 100}% off when buying ${this.threshold} or more`;
  }
}