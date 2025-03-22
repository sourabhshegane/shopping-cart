# Shopping Cart Implementation

A modern, interactive shopping cart implementation that handles various pricing rules and special offers.

## Features

- Real-time cart updates and total calculation
- Special offer handling:
  - Buy One Get One Free (BOGOF) on Melons
  - 3 for the price of 2 on Limes
- Modern, responsive UI
- Interactive product selection
- Clear display of active offers

## Product Pricing

| Product | Price | Special Offer |
|---------|--------|---------------|
| Apple   | 35p    | -             |
| Banana  | 20p    | -             |
| Melon   | 50p    | Buy One Get One Free |
| Lime    | 15p    | 3 for the price of 2 |

## Running the Application

### Prerequisites
- Node.js installed on your machine
- npm (Node Package Manager)

### Installation Steps

1. Clone or download this repository
2. Open a terminal in the project directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

## Testing the Implementation

To verify the shopping cart works correctly, you can test these scenarios:

### Scenario 1: Basic Pricing
1. Add 1 Apple (35p)
2. Add 1 Banana (20p)
Expected Total: 55p

### Scenario 2: Buy One Get One Free
1. Add 1 Melon (50p)
2. Add 1 Melon 
Expected Total: 50p (second melon free)

### Scenario 3: Three for Two
1. Add 3 Limes (15p each)
Expected Total: 30p (third lime free)

### Scenario 4: Mixed Basket
1. Add 2 Melons
2. Add 3 Limes
3. Add 1 Apple
Expected Total: 115p
- Melons: 50p (BOGOF applied)
- Limes: 30p (3 for 2 applied)
- Apple: 35p

## Implementation Details

The shopping cart is implemented using vanilla JavaScript with the following key components:

- `index.html`: Structure and styling
- `index.js`: Business logic and DOM manipulation
- Price catalog with special offer functions
- Real-time total calculation
- Dynamic basket display updates
\