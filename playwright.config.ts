import { defineConfig, devices } from '@playwright/test';

const UI_BASE_URL = process.env.UI_BASE_URL ?? 'https://www.saucedemo.com';
const API_BASE_URL = process.env.API_BASE_URL ?? 'https://jsonplaceholder.typicode.com';
const AUTH_FILE = '.auth/standard-user.json';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 30_000,
  expect: { timeout: 7_000 },
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ...(process.env.CI ? [['github'] as ['github']] : []),
  ],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    testIdAttribute: 'data-test',
  },
  projects: [
    // 1. Log in once and save the session so UI tests start already authenticated.
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
      use: { ...devices['Desktop Chrome'], baseURL: UI_BASE_URL },
    },
    // 2. Authenticated UI tests (inventory, cart, checkout).
    {
      name: 'e2e',
      testDir: './tests/e2e',
      testIgnore: /login\.spec\.ts/,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        baseURL: UI_BASE_URL,
        storageState: AUTH_FILE,
      },
    },
    // 3. Login tests run without any saved session.
    {
      name: 'e2e-login',
      testDir: './tests/e2e',
      testMatch: /login\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], baseURL: UI_BASE_URL },
    },
    // 4. API tests use the request context only (no browser).
    {
      name: 'api',
      testDir: './tests/api',
      use: { baseURL: API_BASE_URL },
    },
  ],
});
