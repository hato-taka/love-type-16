import { test, expect } from 'playwright/test';

// トップページから診断開始し最後に結果画面が表示されるまでの一連の操作を確認するテスト
test('トップページから診断結果まで進める', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '診断をはじめる' }).click();

  const totalQuestions = 16;

  for (let i = 0; i < totalQuestions; i += 1) {
    await page.getByRole('button', { name: /選択肢[AB]/ }).first().click();

    if (i < totalQuestions - 1) {
      await expect(page.getByText(`Question ${i + 2} /`)).toBeVisible();
    }
  }

  const resultButton = page.getByRole('button', { name: '診断結果を見る' });
  await expect(resultButton).toBeEnabled();
  await resultButton.click();
  await expect(page.getByRole('heading', { name: /タイプ/ })).toBeVisible();
});
