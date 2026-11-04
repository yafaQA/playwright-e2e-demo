import { expect, test } from '../fixtures';
import { PASSWORD, users } from '../data/users';

// These tests exercise the login form itself, so they start without a saved session.
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('standard user can log in and lands on the inventory', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.title).toHaveText('Products');
  });

  test('locked out user sees an explicit error', async ({ loginPage }) => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await expect(loginPage.error).toContainText('Sorry, this user has been locked out.');
  });

  test('wrong password is rejected', async ({ loginPage }) => {
    await loginPage.login(users.standard.username, 'wrong_password');
    await expect(loginPage.error).toContainText('Username and password do not match any user in this service');
  });

  test('username is required', async ({ loginPage }) => {
    await loginPage.login('', PASSWORD);
    await expect(loginPage.error).toContainText('Username is required');
  });

  test('password is required', async ({ loginPage }) => {
    await loginPage.login(users.standard.username, '');
    await expect(loginPage.error).toContainText('Password is required');
  });
});
