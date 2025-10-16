import { test, expect } from '@playwright/test';

test('トップページから診断結果まで進める', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '診断をはじめる' }).click();

  for (let i = 0; i < 16; i += 1) {
    await page.getByRole('button', { name: /A|B/ }).first().click();
  }

  await page.getByRole('button', { name: '診断結果を見る' }).click();
  await expect(page.getByRole('heading', { name: /タイプ/ })).toBeVisible();
});
