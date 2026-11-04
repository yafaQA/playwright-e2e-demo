# Playwright E2E & API Test Automation Demo

A small but production-style test automation project built with **Playwright + TypeScript**.
It is a public code sample: it shows how I structure UI and API test suites, not client code.

- **UI tests** run against [Sauce Demo](https://www.saucedemo.com), a public practice shop.
- **API tests** run against [JSONPlaceholder](https://jsonplaceholder.typicode.com), a free fake REST API.

## What it demonstrates

- Page Object Model with custom Playwright **fixtures**
- **Authenticated session reuse** (`storageState`) through a setup project, so tests don't log in every time
- Login tests that opt out of the saved session to test the form itself
- Stable locators via `data-test` attributes (`testIdAttribute`)
- **API testing** with Playwright's `request` fixture
- Traces, screenshots and videos kept on failure; HTML report
- **CI with GitHub Actions** (type-check, run, upload report)

## Project structure

```
tests/
  auth.setup.ts        # logs in once, saves the session
  fixtures.ts          # page objects exposed as fixtures
  data/                # users, products
  pages/               # LoginPage, InventoryPage, CartPage, CheckoutPage
  e2e/                 # login, inventory, cart, checkout specs
  api/posts.spec.ts    # REST API checks
playwright.config.ts   # projects: setup, e2e, e2e-login, api
.github/workflows/     # CI pipeline
```

## Getting started

```bash
npm ci
npx playwright install chromium
npx playwright test          # everything
npm run test:e2e             # UI only
npm run test:api             # API only
npm run report               # open the HTML report
```

Base URLs can be overridden with `UI_BASE_URL` and `API_BASE_URL`.

## CI

Every push and pull request runs type-checking and the full suite on GitHub Actions;
the HTML report is uploaded as a build artifact.

## About

Built by Yassine Fathallah, freelance QA automation engineer (12+ years: Playwright, Cypress, API testing, CI/CD).
