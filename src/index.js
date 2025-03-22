class ShoppingCartUI {
  constructor() {
    this.cart = new CartManager();
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.querySelectorAll('.product-button').forEach(button => {
      button.addEventListener('click', (e) => {
        const product = e.target.dataset.product;
        this.addToCart(product);
      });
    });
  }

  addToCart(product) {
    this.cart.addItem(product);
    this.updateUI();
  }

  updateUI() {
    const basketElement = document.getElementById('basket');
    const breakdownElement = document.getElementById('priceBreakdown');
    
    // Group items for breakdown calculation
    const groupedItems = this.groupItems(this.cart.items);
    const breakdown = this.calculateBreakdown(groupedItems);
    
    // Update basket items
    basketElement.innerHTML = this.cart.items
      .map((item, index) => `
        <div class="basket-item">
          <span>${item}</span>
          <button onclick="shoppingCartUI.removeItem(${index})" class="remove-button">×</button>
        </div>
      `)
      .join('');

    // Update breakdown
    breakdownElement.innerHTML = Object.entries(breakdown.items)
      .map(([item, details]) => `
        <div class="breakdown-item">
          <div>
            <div>${details.quantity}× ${item}</div>
            ${details.offerApplied ? `
              <div class="offer-applied">
                ${details.offerApplied}
              </div>
            ` : ''}
          </div>
          <div>
            ${details.originalPrice}p
            ${details.savings > 0 ? `
              <div class="offer-applied">
                -${details.savings}p saved
              </div>
            ` : ''}
          </div>
        </div>
      `)
      .join('');

    // Update totals
    document.getElementById('subtotal').textContent = `${breakdown.subtotal}p`;
    document.getElementById('savings').textContent = `-${breakdown.totalSavings}p`;
    document.getElementById('total').textContent = `${breakdown.finalTotal}p`;
  }

  groupItems(items) {
    return items.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});
  }

  calculateBreakdown(groupedItems) {
    let breakdown = {
      items: {},
      subtotal: 0,
      totalSavings: 0,
      finalTotal: 0
    };

    for (const [item, quantity] of Object.entries(groupedItems)) {
      const itemConfig = PRICE_CATALOG[item];
      const regularPrice = quantity * itemConfig.price;
      const finalPrice = itemConfig.specialOffer ? 
        itemConfig.specialOffer(quantity) : 
        regularPrice;
      const savings = regularPrice - finalPrice;

      breakdown.items[item] = {
        quantity,
        originalPrice: regularPrice,
        finalPrice,
        savings,
        offerApplied: itemConfig.offerText
      };

      breakdown.subtotal += regularPrice;
      breakdown.totalSavings += savings;
      breakdown.finalTotal += finalPrice;
    }

    return breakdown;
  }

  removeItem(index) {
    this.cart.removeItem(index);
    this.updateUI();
  }
}

// Initialize the UI
const shoppingCartUI = new ShoppingCartUI();