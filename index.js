// Price catalog with special offers
const PRICE_CATALOG = {
  Apple: { price: 35, specialOffer: null },
  Banana: { price: 20, specialOffer: null },
  Melon: { 
    price: 50, 
    specialOffer: (quantity) => Math.ceil(quantity / 2) * 50,
    offerText: "Buy One Get One Free"
  },
  Lime: { 
    price: 15, 
    specialOffer: (quantity) => Math.ceil(quantity * 2 / 3) * 15,
    offerText: "3 for the price of 2"
  }
};

let basket = [];

function calculateTotal(basket) {
  // Count items in basket
  const itemCount = basket.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});

  // Calculate total price
  return Object.entries(itemCount).reduce((total, [item, quantity]) => {
    const { price, specialOffer } = PRICE_CATALOG[item];
    const itemTotal = specialOffer ? specialOffer(quantity) : price * quantity;
    return total + itemTotal;
  }, 0);
}

function updateBasketDisplay() {
  const basketDiv = document.getElementById('basket');
  const totalSpan = document.getElementById('total');
  const offerInfoDiv = document.getElementById('offerInfo');

  // Clear current display
  basketDiv.innerHTML = '';
  
  // Count items
  const itemCount = basket.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});

  // Display items
  Object.entries(itemCount).forEach(([item, quantity]) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'basket-item';
    itemDiv.innerHTML = `
      <span>${item} x${quantity} (${PRICE_CATALOG[item].price}p each)</span>
      <button class="remove-button" onclick="removeItem('${item}')">✕</button>
    `;
    basketDiv.appendChild(itemDiv);
  });

  // Update total
  const total = calculateTotal(basket);
  totalSpan.textContent = `${total}p`;

  // Show active offers
  const activeOffers = [];
  Object.entries(itemCount).forEach(([item, quantity]) => {
    if (PRICE_CATALOG[item].offerText && quantity > 1) {
      activeOffers.push(`${item}: ${PRICE_CATALOG[item].offerText}`);
    }
  });
  
  offerInfoDiv.textContent = activeOffers.length 
    ? `Active offers: ${activeOffers.join(', ')}` 
    : '';
}

function addItem(product) {
  basket.push(product);
  updateBasketDisplay();
}

function removeItem(product) {
  const index = basket.lastIndexOf(product);
  if (index !== -1) {
    basket.splice(index, 1);
    updateBasketDisplay();
  }
}

// Set up event listeners
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.product-button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      addItem(button.dataset.product);
    });
  });
});