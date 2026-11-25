import { test, expect } from '../fixtures/baseTest';
import { LoginPage } from '../pages/loginPage';
import { SignupPage } from '../pages/signupPage';
import { generateRandomUser } from '../utils/dataGenerator';

test.describe('User Registration Tests', () => {
  test('should register a new user successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);
    const newUser = generateRandomUser();

    // Step 1: Start signup process with random user details
    await loginPage.goto();
    await loginPage.startSignup(newUser.name, newUser.email);

    // Step 2: Fill the full registration form and submit
    await signupPage.fillRegistrationForm(newUser);

    // Step 3: Verify account creation confirmation message
    await expect(signupPage.accountCreatedHeading).toBeVisible();
    await expect(signupPage.accountCreatedHeading).toHaveText('Account Created!');

    // Step 4: Continue to home page and verify user is logged in
    await signupPage.clickContinue();
    await expect(page.locator(`text=Logged in as ${newUser.name}`)).toBeVisible();
  });
});
