export class AnalyticsEvent {
  constructor(type, data) {
    this.type = type;
    this.data = data;
    this.timestamp = new Date();
  }
}

export class AnalyticsObserver {
  constructor() {
    this.events = [];
  }

  update(event) {
    this.events.push(event);
    this.analyze(event);
  }

  analyze(event) {
    switch (event.type) {
      case 'ADD_ITEM':
        this.analyzeAddItem(event);
        break;
      case 'APPLY_OFFER':
        this.analyzeOffer(event);
        break;
      case 'CHECKOUT':
        this.analyzeCheckout(event);
        break;
    }
  }

  analyzeAddItem(event) {
    const itemCounts = this.events
      .filter(e => e.type === 'ADD_ITEM')
      .reduce((acc, e) => {
        acc[e.data.item] = (acc[e.data.item] || 0) + 1;
        return acc;
      }, {});

    return {
      popularItems: Object.entries(itemCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3),
      totalItems: Object.values(itemCounts).reduce((a, b) => a + b, 0)
    };
  }

  analyzeOffer(event) {
    const offerUsage = this.events
      .filter(e => e.type === 'APPLY_OFFER')
      .reduce((acc, e) => {
        acc[e.data.offerType] = (acc[e.data.offerType] || 0) + 1;
        return acc;
      }, {});

    return {
      mostUsedOffer: Object.entries(offerUsage)
        .sort(([,a], [,b]) => b - a)[0],
      totalSavings: this.events
        .filter(e => e.type === 'APPLY_OFFER')
        .reduce((sum, e) => sum + e.data.savings, 0)
    };
  }

  generateReport() {
    const addItemAnalysis = this.analyzeAddItem({});
    const offerAnalysis = this.analyzeOffer({});

    return {
      totalTransactions: this.events.filter(e => e.type === 'CHECKOUT').length,
      popularItems: addItemAnalysis.popularItems,
      totalItems: addItemAnalysis.totalItems,
      mostUsedOffer: offerAnalysis.mostUsedOffer,
      totalSavings: offerAnalysis.totalSavings,
      averageBasketSize: addItemAnalysis.totalItems / 
        Math.max(1, this.events.filter(e => e.type === 'CHECKOUT').length)
    };
  }
}