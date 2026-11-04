import { expect, test } from '../fixtures';
import { backpack, bikeLight } from '../data/products';

test.describe('Cart', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('badge counts the items added', async ({ inventoryPage }) => {
    await inventoryPage.addToCart(backpack.name);
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await inventoryPage.addToCart(bikeLight.name);
    await expect(inventoryPage.cartBadge).toHaveText('2');
  });

  test('cart shows the selected products', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCart(backpack.name);
    await inventoryPage.addToCart(bikeLight.name);
    await inventoryPage.openCart();
    await expect(cartPage.itemNames).toHaveText([backpack.name, bikeLight.name]);
  });

  test('a product can be removed from the cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCart(backpack.name);
    await inventoryPage.openCart();
    await cartPage.remove(backpack.name);
    await expect(cartPage.items).toHaveCount(0);
  });
});
