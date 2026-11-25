import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Each row in the cart table represents a product
    this.cartItems = page.locator('#cart_info_table tbody tr');
    this.proceedToCheckoutButton = page.locator('a.check_out');
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }
}
