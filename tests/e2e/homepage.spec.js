const { test, expect } = require("@playwright/test");

test.describe("Homepage", () => {
  test("should load the homepage and display the correct title", async ({
    page,
  }) => {
    await page.goto("https://date-night-2-456a8b6a285c.herokuapp.com/");
    await expect(page).toHaveTitle(/Date Night | Home/i);
  });

  test("should display the main heading", async ({ page }) => {
    await page.goto("https://date-night-2-456a8b6a285c.herokuapp.com/");
    const heading = await page.locator("h3");
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText(/Plan your date night/i);
  });
});
