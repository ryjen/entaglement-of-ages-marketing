const { test, expect } = require('@playwright/test');

const base = process.env.SITE_BASE_URL || 'http://127.0.0.1:4173/';

test('desktop recurring-question grid is centered as a compact composition', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  const response = await page.goto(new URL('', base).href, { waitUntil: 'networkidle' });
  expect(response && response.status()).toBeLessThan(400);

  const grid = page.locator('.trilogy-question-grid').first();
  await expect(grid).toBeVisible();
  const box = await grid.boundingBox();
  expect(box).not.toBeNull();

  const center = box.x + box.width / 2;
  expect(Math.abs(center - 720)).toBeLessThanOrEqual(1);
  expect(box.width).toBeLessThanOrEqual(840);
});
