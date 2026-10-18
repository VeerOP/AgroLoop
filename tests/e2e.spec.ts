import { test, expect } from '@playwright/test';

test.describe('AgroLoop Master Circular Loop E2E Scenarios', () => {
  test('Public Landing Page renders clean modern typography, metrics & simulator', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.locator('h1')).toContainText('Turning urban food waste into regenerative soil health');
    await expect(page.getByText('Launch Platform Demo')).toBeVisible();
    await expect(page.getByText('6,500 MT')).toBeVisible();
    await expect(page.getByText('Interactive Financial & Impact Model')).toBeVisible();
  });

  test('Public Products page renders bio-input catalog', async ({ page }) => {
    await page.goto('http://localhost:3000/products');
    await expect(page.locator('h1')).toContainText('AgroLoop Agricultural Products');
    await expect(page.getByText('Bio-Enriched Vermicompost')).toBeVisible();
    await expect(page.getByText('Biochar Carbon Matrix')).toBeVisible();
  });

  test('Demo Login redirects to correct role dashboard', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.click('button:has-text("Household (Priya)")');
    await page.click('button:has-text("Enter HOUSEHOLD Dashboard")');
    await expect(page).toHaveURL(/.*\/dashboard\/household/);
    await expect(page.getByText('Good morning, Priya')).toBeVisible();
  });
});
