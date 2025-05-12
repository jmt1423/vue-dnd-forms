import { test, expect } from '@playwright/test';

test('has breadcrumb title', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await page.getByRole('button', { name: 'Text Single line text field' }).dragTo(page.locator('.mx-auto > .h-full'))
  await page.getByLabel('Client name').fill('John')
});
