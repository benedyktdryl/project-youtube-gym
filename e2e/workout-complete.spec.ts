import { expect, test } from "@playwright/test";

test.describe("Complete scheduled workout", () => {
  test("logs in via mock OAuth and marks a scheduled workout complete", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("link", { name: /continue with google/i }).click();
    await expect(page.getByRole("heading", { name: /dashboard/i })).toBeVisible();

    const upcoming = page.getByRole("heading", { name: /upcoming workouts/i }).locator("..");
    const firstWorkoutLink = upcoming.getByRole("link").first();
    await firstWorkoutLink.click();

    const completeButton = page.getByRole("button", { name: /mark as completed/i });
    await completeButton.click();
    await expect(completeButton).toBeDisabled();
    await expect(completeButton).toHaveText(/completed/i);
  });
});
