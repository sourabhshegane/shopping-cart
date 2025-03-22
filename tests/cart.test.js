import { expect } from 'chai';
import { CartManager } from '../src/cartManager';

describe('Shopping Cart Tests', () => {
  let cart;

  beforeEach(() => {
    cart = new CartManager();
  });

  describe('Basic Pricing', () => {
    it('should calculate correct total for single items', () => {
      cart.addItem('Apple');
      expect(cart.getTotal()).to.equal(35);
    });
  });

  describe('Special Offers', () => {
    it('should apply BOGOF correctly for Melons', () => {
      cart.addItem('Melon');
      cart.addItem('Melon');
      expect(cart.getTotal()).to.equal(50);
    });

    it('should apply 3 for 2 correctly for Limes', () => {
      cart.addItem('Lime');
      cart.addItem('Lime');
      cart.addItem('Lime');
      expect(cart.getTotal()).to.equal(30);
    });
  });
});