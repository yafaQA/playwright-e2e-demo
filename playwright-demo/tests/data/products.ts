export interface Product {
  name: string;
  price: number;
}

export const backpack: Product = { name: 'Sauce Labs Backpack', price: 29.99 };
export const bikeLight: Product = { name: 'Sauce Labs Bike Light', price: 9.99 };

/** "Sauce Labs Backpack" -> "sauce-labs-backpack" (used by the site's data-test ids). */
export const slug = (name: string): string => name.toLowerCase().replace(/\s+/g, '-');
