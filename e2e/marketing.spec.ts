import { expect, test } from "@playwright/test";

test.describe("Marketing site", () => {
  test("shows hero CTA and routes to registration", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: /smart youtube workout/i })).toBeVisible();
    await page.getByRole("link", { name: /get started/i }).click();

    await expect(page).toHaveURL(/\/register$/);
    await expect(page.getByRole("heading", { name: /create an account/i })).toBeVisible();
    await expect(page.getByLabel("Name")).toBeVisible();
  });

  test("lists popular workouts pulled from marketing mocks", async ({ page }) => {
    await page.goto("/");

    const cards = page.locator('section:has-text("Popular Workouts") img');

    await expect(cards).toHaveCount(6);
    await expect(page.getByText(/hiit workout/i)).toBeVisible();
    await expect(page.getByText(/arm workout/i)).toBeVisible();
  });

  test("shows login form fields and demo credentials", async ({ page }) => {
    await page.goto("/login");

    await expect(page.getByRole("heading", { name: /welcome back/i })).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByText(/demo account/i)).toBeVisible();
    await expect(page.getByRole("link", { name: /continue with google/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /continue with apple/i })).toBeVisible();
  });
});
