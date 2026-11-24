import { test, expect } from '../fixtures/baseTest';
import { LoginPage } from '../pages/loginPage';

test.describe('Authentication Tests', () => {
  test('should display an error message when logging in with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to the login page and attempt to log in with wrong details
    await loginPage.goto();
    await loginPage.login('invalid_user_999@test.com', 'WrongPass123');

    // Verify that the error message appears with the exact expected text
    await expect(loginPage.loginErrorMessage).toBeVisible();
    await expect(loginPage.loginErrorMessage).toHaveText('Your email or password is incorrect!');
  });
});
