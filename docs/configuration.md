# 設定ガイド

| 環境 | 主要変数 | 説明 |
|------|----------|------|
| 開発 | `NEXT_PUBLIC_SITE_NAME` | タイトルや OG 用のサイト名。 |
| 開発 | `NEXT_PUBLIC_SHARE_HASHTAG` | 結果画面のシェアボタンで利用予定。 |
| テスト | `PLAYWRIGHT_BASE_URL` | Playwright 実行時のベース URL。 |

Secrets や API キーは各環境のシークレットマネージャーに保存し、`.env.local` に実値を記述しないでください。
