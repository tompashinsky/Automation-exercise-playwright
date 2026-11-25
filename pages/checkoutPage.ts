import { Page, Locator } from '@playwright/test';

export interface PaymentDetails {
  nameOnCard: string;
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
}

export class CheckoutPage {
  readonly page: Page;
  readonly placeOrderButton: Locator;
  readonly nameOnCardInput: Locator;
  readonly cardNumberInput: Locator;
  readonly cvcInput: Locator;
  readonly expiryMonthInput: Locator;
  readonly expiryYearInput: Locator;
  readonly payAndConfirmButton: Locator;
  readonly orderPlacedHeading: Locator;
  readonly downloadInvoiceButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Order summary page
    this.placeOrderButton = page.locator('a[href="/payment"]');

    // Payment details form
    this.nameOnCardInput = page.locator('[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('[data-qa="card-number"]');
    this.cvcInput = page.locator('[data-qa="cvc"]');
    this.expiryMonthInput = page.locator('[data-qa="expiry-month"]');
    this.expiryYearInput = page.locator('[data-qa="expiry-year"]');
    this.payAndConfirmButton = page.locator('[data-qa="pay-button"]');

    // Confirmation page
    this.orderPlacedHeading = page.locator('[data-qa="order-placed"]');
    this.downloadInvoiceButton = page.locator('a.check_out:has-text("Download Invoice")');
  }

  async clickPlaceOrder() {
    await this.placeOrderButton.click();
  }

  async fillPaymentAndConfirm(payment: PaymentDetails) {
    await this.nameOnCardInput.fill(payment.nameOnCard);
    await this.cardNumberInput.fill(payment.cardNumber);
    await this.cvcInput.fill(payment.cvc);
    await this.expiryMonthInput.fill(payment.expiryMonth);
    await this.expiryYearInput.fill(payment.expiryYear);
    await this.payAndConfirmButton.click();
  }
}
