import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { getAllResults } from '@/lib/quiz';

// results.json の整合性を静的に検証しデータ欠落を早期に検知するテスト群
describe('results dataset', () => {
  // 16タイプすべての診断結果が揃っていることを確認する
  it('contains 16 personality entries', () => {
    expect(getAllResults()).toHaveLength(16);
  });

  // 各診断結果が参照する画像ファイルがローカルに存在することを確認する
  it('has local image assets for every result', () => {
    const results = getAllResults();
    const publicDir = join(process.cwd(), 'public');

    const missingAssets = results
      .map((result) => {
        const normalizedPath = result.image.startsWith('/')
          ? result.image.slice(1)
          : result.image;
        const assetPath = join(publicDir, normalizedPath);

        return {
          type: result.type,
          image: result.image,
          assetPath,
          exists: existsSync(assetPath)
        };
      })
      .filter((entry) => !entry.exists);

    if (missingAssets.length > 0) {
      const list = missingAssets
        .map((entry) => `${entry.type}: ${entry.image} -> ${entry.assetPath}`)
        .join('\n');

      throw new Error(`Missing result image files:\n${list}`);
    }
  });
});
