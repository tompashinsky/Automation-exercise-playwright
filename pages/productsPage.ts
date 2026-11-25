import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchedProductsHeading: Locator;
  readonly productTitles: Locator;
  readonly continueShoppingButton: Locator;
  readonly viewCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.searchedProductsHeading = page.locator('h2:has-text("Searched Products")');
    this.productTitles = page.locator('.productinfo p');
    this.continueShoppingButton = page.locator('button:has-text("Continue Shopping")');
    this.viewCartLink = page.locator('.modal-body a[href="/view_cart"]');
  }

  async goto() {
    await this.page.goto('/products');
  }

  // Search for a product by name
  async searchProduct(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  // Add the first visible product in the list to the cart
  async addFirstProductToCart() {
    // Locate the first product card and click its 'Add to cart' button
    const firstProductAddBtn = this.page.locator('.productinfo a.add-to-cart').first();
    await firstProductAddBtn.click();
  }

  // View the cart after adding a product
  async clickViewCart() {
    await this.viewCartLink.click();
  }
}
