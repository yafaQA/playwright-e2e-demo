import { expect, test as setup } from '@playwright/test';
import { users } from './data/users';
import { LoginPage } from './pages/LoginPage';

const AUTH_FILE = '.auth/standard-user.json';

// Runs once before the authenticated UI tests and stores the session,
// so those tests do not repeat the login flow.
setup('authenticate as standard user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);
  await expect(page).toHaveURL(/inventory\.html/);
  await page.context().storageState({ path: AUTH_FILE });
});
