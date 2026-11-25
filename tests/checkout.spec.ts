import { test, expect } from '../fixtures/baseTest';
import { LoginPage } from '../pages/loginPage';
import { SignupPage } from '../pages/signupPage';
import { ProductsPage } from '../pages/productsPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage, PaymentDetails } from '../pages/checkoutPage';
import { generateRandomUser } from '../utils/dataGenerator';

test.describe('Store & Checkout E2E Tests', () => {
  test('should search for a product and display matching results', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.goto();
    await productsPage.searchProduct('Tshirt');

    await expect(productsPage.searchedProductsHeading).toBeVisible();
    const count = await productsPage.productTitles.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should complete a full purchase flow and download invoice', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    const user = generateRandomUser();
    const paymentDetails: PaymentDetails = {
      nameOnCard: `${user.firstName} ${user.lastName}`,
      cardNumber: '4111222233334444',
      cvc: '123',
      expiryMonth: '12',
      expiryYear: '2028',
    };

    // Step 1: Register a new user so we can complete checkout
    await loginPage.goto();
    await loginPage.startSignup(user.name, user.email);
    await signupPage.fillRegistrationForm(user);
    await expect(signupPage.accountCreatedHeading).toBeVisible();
    await signupPage.clickContinue();

    // Step 2: Go to products, add an item to cart, and navigate to cart
    await productsPage.goto();
    await productsPage.addFirstProductToCart();
    await productsPage.clickViewCart();

    // Step 3: Verify item is in cart and proceed to checkout
    await expect(cartPage.cartItems).toHaveCount(1);
    await cartPage.proceedToCheckout();

    // Step 4: Place order and enter payment details
    await checkoutPage.clickPlaceOrder();
    await checkoutPage.fillPaymentAndConfirm(paymentDetails);

    // Step 5: Verify order confirmation and test invoice download
    await expect(checkoutPage.orderPlacedHeading).toBeVisible();
    await expect(checkoutPage.orderPlacedHeading).toHaveText('Order Placed!');

    // Wait for the download event while clicking the download button
    const downloadPromise = page.waitForEvent('download');
    await checkoutPage.downloadInvoiceButton.click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain('invoice');
  });
});
