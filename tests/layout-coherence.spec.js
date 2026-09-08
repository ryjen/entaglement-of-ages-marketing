const { test, expect } = require('@playwright/test');

const base = process.env.SITE_BASE_URL || 'http://127.0.0.1:4173/';
const siteUrl = route => new URL(route, base).href;

async function boxCenterX(locator) {
  const box = await locator.boundingBox();
  expect(box).not.toBeNull();
  return box.x + box.width / 2;
}

test('mobile homepage centers Entanglement as its own wrapped title line', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(siteUrl(''), { waitUntil: 'networkidle' });

  const title = page.locator('#hero-title');
  const words = title.locator('.title-lock');
  await expect(words).toHaveCount(2);

  const first = await words.nth(0).boundingBox();
  const second = await words.nth(1).boundingBox();
  expect(first).not.toBeNull();
  expect(second).not.toBeNull();
  expect(second.y).toBeGreaterThan(first.y + 1);

  const titleCenter = await boxCenterX(title);
  const wordCenter = first.x + first.width / 2;
  expect(Math.abs(wordCenter - titleCenter)).toBeLessThanOrEqual(1);

  const rectCount = await words.nth(0).evaluate(element => element.getClientRects().length);
  expect(rectCount).toBe(1);
});

test('homepage editorial and release frames are centered while copy stays left aligned', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(siteUrl(''), { waitUntil: 'networkidle' });

  const blocks = page.locator('.home-copy-block');
  await expect(blocks).toHaveCount(2);
  for (let index = 0; index < 2; index += 1) {
    const block = blocks.nth(index);
    const center = await boxCenterX(block);
    expect(Math.abs(center - 720)).toBeLessThanOrEqual(1);
    const style = await block.evaluate(element => getComputedStyle(element).textAlign);
    expect(style).toBe('left');
    const justify = await block.locator('.actions').evaluate(element => getComputedStyle(element).justifyContent);
    expect(justify).toBe('flex-start');
  }

  const cardAlignment = await page.locator('.trilogy-question-grid article').first().evaluate(element => ({
    textAlign: getComputedStyle(element).textAlign,
    justifyItems: getComputedStyle(element).justifyItems,
  }));
  expect(cardAlignment).toEqual({ textAlign: 'left', justifyItems: 'start' });
});

test('About keeps Entanglement intact at mobile width and 200% text sizing', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(siteUrl('about/'), { waitUntil: 'networkidle' });

  const word = page.locator('#page-title .title-lock');
  await expect(word).toHaveText('Entanglement');
  expect(await word.evaluate(element => element.getClientRects().length)).toBe(1);

  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  expect(await word.evaluate(element => element.getClientRects().length)).toBe(1);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  const box = await word.boundingBox();
  expect(box).not.toBeNull();
  expect(box.x).toBeGreaterThanOrEqual(-1);
  expect(box.x + box.width).toBeLessThanOrEqual(376);
});
