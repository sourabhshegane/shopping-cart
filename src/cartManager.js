export class CartManager {
  constructor() {
    this.items = [];
    this.commandManager = new CommandManager();
    this.analytics = new AnalyticsObserver();
    this.pricingStrategies = {
      regular: new RegularPricing(),
      bogof: new BuyOneGetOneFree(),
      threeForTwo: new ThreeForTwo(),
      bulkDiscount: new BulkDiscount(5, 0.1) // 10% off when buying 5 or more
    };
  }

  addItem(item) {
    CartValidator.validateItem(item);
    const command = new AddItemCommand(this, item);
    this.commandManager.execute(command);
    
    this.analytics.update(new AnalyticsEvent('ADD_ITEM', {
      item,
      timestamp: new Date()
    }));
    
    this.notifySubscribers();
  }

  removeItem(index) {
    this.items.splice(index, 1);
    this.recalculateTotal();
    this.notifySubscribers();
  }

  calculateTotal() {
    const groupedItems = this.groupItems();
    let total = 0;
    let savings = 0;

    for (const [item, quantity] of Object.entries(groupedItems)) {
      const itemConfig = PRICE_CATALOG[item];
      const strategy = this.getPricingStrategy(itemConfig);
      
      const regularPrice = quantity * itemConfig.price;
      const finalPrice = strategy.calculate(quantity, itemConfig.price);
      
      total += finalPrice;
      savings += regularPrice - finalPrice;

      if (savings > 0) {
        this.analytics.update(new AnalyticsEvent('APPLY_OFFER', {
          item,
          quantity,
          offerType: strategy.getDescription(),
          savings: regularPrice - finalPrice
        }));
      }
    }

    return { total, savings };
  }

  getPricingStrategy(itemConfig) {
    if (itemConfig.specialOffer === 'BOGOF') return this.pricingStrategies.bogof;
    if (itemConfig.specialOffer === 'THREE_FOR_TWO') return this.pricingStrategies.threeForTwo;
    if (itemConfig.specialOffer === 'BULK_DISCOUNT') return this.pricingStrategies.bulkDiscount;
    return this.pricingStrategies.regular;
  }

  undo() {
    this.commandManager.undo();
    this.notifySubscribers();
  }

  redo() {
    this.commandManager.redo();
    this.notifySubscribers();
  }

  getAnalyticsReport() {
    return this.analytics.generateReport();
  }

  // Observer pattern for UI updates
  subscribe(callback) {
    this.subscribers.push(callback);
  }
}

class OfferEngine {
  calculateTotal(items) {
    const groupedItems = this.groupItems(items);
    return Object.entries(groupedItems).reduce((total, [item, quantity]) => {
      return total + this.applyOffers(item, quantity);
    }, 0);
  }

  applyOffers(item, quantity) {
    const itemConfig = PRICE_CATALOG[item];
    return itemConfig.specialOffer ? 
      itemConfig.specialOffer(quantity) : 
      itemConfig.price * quantity;
  }
}