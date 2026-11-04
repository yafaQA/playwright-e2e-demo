import { expect, test } from '../fixtures';
import { backpack } from '../data/products';
import { checkoutDetails } from '../data/users';

test.describe('Checkout', () => {
  test.beforeEach(async ({ inventoryPage, cartPage }) => {
    await inventoryPage.goto();
    await inventoryPage.addToCart(backpack.name);
    await inventoryPage.openCart();
    await cartPage.checkout();
  });

  test('customer information is required', async ({ checkoutPage }) => {
    await checkoutPage.continueButton.click();
    await expect(checkoutPage.error).toContainText('First Name is required');
  });

  test('order summary shows the item total', async ({ checkoutPage }) => {
    await checkoutPage.fillCustomerInfo(checkoutDetails);
    await expect(checkoutPage.subtotal).toContainText(`$${backpack.price}`);
  });

  test('user can complete an order end to end', async ({ checkoutPage, page }) => {
    await checkoutPage.fillCustomerInfo(checkoutDetails);
    await checkoutPage.finish();
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });
});

