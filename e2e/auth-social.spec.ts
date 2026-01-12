import { expect, test } from "@playwright/test";

test.beforeEach(async ({ context }) => {
  await context.clearCookies();
});

test("signs in with Google OAuth", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("link", { name: /continue with google/i }).click();
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});

test("signs in with Apple OAuth", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("link", { name: /continue with apple/i }).click();
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});
