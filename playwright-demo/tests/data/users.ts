// Public demo credentials published on the Sauce Demo login page.
// Never commit real credentials: for a real project, read them from environment variables.
export const PASSWORD = process.env.DEMO_PASSWORD ?? 'secret_sauce';

export const users = {
  standard: { username: 'standard_user', password: PASSWORD },
  lockedOut: { username: 'locked_out_user', password: PASSWORD },
} as const;

export const checkoutDetails = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  postalCode: '75001',
} as const;
