import { test, expect } from 'playwright/test';

// 一覧ページが全タイプのカードを表示することを確認するスモークテスト

test('結果一覧ページで全16タイプのカードが表示される', async ({ page }) => {
  await page.goto('/results');

  await expect(page.getByRole('heading', { name: '全16タイプのサンリオキャラ診断一覧' })).toBeVisible();

  const cardLinks = page.locator('a[href^="/results/"]');
  await expect(cardLinks).toHaveCount(16);
});

// 個別結果ページから一覧ページへ遷移できることを確認するテスト

test('個別の結果ページから一覧ページへ遷移できる', async ({ page }) => {
  await page.goto('/results/scf-t');

  await page.getByRole('link', { name: '全タイプの一覧を見る' }).click();

  await expect(page).toHaveURL(/\/results$/);
  await expect(page.getByRole('heading', { name: '全16タイプのサンリオキャラ診断一覧' })).toBeVisible();
});
