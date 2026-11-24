import { test as base } from '@playwright/test';

// Extend the default Playwright test object
export const test = base.extend({
  // Override the default 'page' fixture  
  page: async ({ page }, use) => {
    // Intercept all network requests before they are sent
    await page.route('**/*', (route) => {
      const url = route.request().url();

      // Check if the request URL belongs to known ad servers
      if (
        url.includes('googleads') ||
        url.includes('doubleclick') ||
        url.includes('googlesyndication') ||
        url.includes('adservice')
      ) {
        // Block the ad request
        route.abort();
      } else {
        // Allow all other legitimate requests to proceed
        route.continue();
      }
    });

    // Pass the clean, ad-blocked page to the test
    await use(page);
  },
});

// Re-export 'expect' so tests only need to import from this file
export { expect } from '@playwright/test';
