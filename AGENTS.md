# AGENTS.md

## 🧠 Agent Name

`sanrio-personality-checker`

---

## 🪞Purpose

30代女性向けに設計された、**恋愛傾向をサンリオキャラクターで診断できるWebアプリ**です。  
4軸×2タイプで構成された16タイプの性格分類に基づき、あなたの内面をキャラとともに可視化します。  
**恋愛観・働き方・推し活タイプ**など、人生を彩る視点から性格を紐解き、楽しく自己理解を促します。

---

## 🎯 Target

- **性別/年代**：主に30代女性（感性や共感性を重視）
- **利用シーン**：友人同士・SNSでのシェア・推し活の話題作り
- **スマホ利用前提**：タップのみで完結、片手でも楽しめるUI設計

---

## 🧩 System Overview

| 項目               | 内容                                                                 |
|--------------------|----------------------------------------------------------------------|
| アプリ形式         | Webアプリ（SPA）                                                     |
| 実行場所           | ブラウザ上（クライアントサイドのみ）                                 |
| フロントエンド     | Next.js または React（TypeScript）                                   |
| バックエンド       | なし（履歴保存・ログイン機能なし）                                   |
| データ処理         | `questions.json`（設問） + `results.json`（診断結果）で構成            |
| 公開方法           | Vercel / Netlify / Firebase Hosting などでCDN配信                     |
| ライセンス         | サンリオキャラ使用は非商用 or ライセンス確認が必要（**要注意！**）   |

---

## 🔢 Personality Axes（性格分類軸）

| 軸名            | 分類A（+1）              | 分類B               | 補足                                  |
|------------------|---------------------------|----------------------|---------------------------------------|
| 行動原理         | Social（もてたい）        | Intrinsic（おもしろい） | 承認欲求 or 内発的モチベ              |
| 認知スタイル     | Concrete（具体思考）       | Abstract（抽象思考）    | 体験派 or 直観派                      |
| 行動スタンス     | Structured（きっちり派）    | Flow（流れに乗る派）     | 計画重視 or 感覚重視                  |
| エネルギー補充   | Talk（人と話して回復）      | Quiet（一人の時間で回復）| 外向 or 内向                         |

合計16タイプ（2^4）が生成され、それぞれにキャラクターを割り当てています。

---

## 🎮 Flow

1. 診断開始（「診断スタート」ボタン）
2. 設問16問に順番通りに答える（すべて選択式 / 2択）
3. 回答は各軸に1点ずつ加算される（例：Social +1）
4. 各軸の合計点から16タイプを算出（例：SCF-T）
5. 対応するサンリオキャラと診断結果を表示
6. SNSでシェア or 再診断

---

## 📊 Scoring Logic

- 設問：16問（各軸4問ずつ）
- 各質問は A or B の2択 → 対応する軸に+1
- 軸スコア：3以上なら Aタイプ、それ未満ならBタイプと判定
- 例：Social / Concrete / Flow / Talk → `SCF-T`
- `results.json` の該当タイプデータを呼び出して表示

---

## 🖼️ Output Format（診断結果テンプレート）

```json
{
  "typeCode": "SCF-T",
  "character": "ハンギョドン",
  "title": "ギャグで生きてる自由人",
  "summary": "盛り上げ担当・妄想力MAXな愛されギャグ人間",
  "description": {
    "働き方": "ルールよりノリと直感重視。成果より楽しさ。",
    "恋愛観": "好かれるより、おもしろいと思われたい。愛情表現は独特。",
    "結婚観": "ずっと友達みたいな関係が理想。束縛は苦手。",
    "人生観": "流されてるようで芯がある。決めつけNG。",
    "推し活タイプ": "ライブ中にコールをアレンジして盛り上げる系"
  },
  "shareImageUrl": "https://cdn.example.com/results/scf-t.png"
}
```

データファイル構成

```
.
├── public/
│   └── results/
│       └── scf-t.png   # キャラ画像（CDNホスト推奨）
├── src/
│   ├── data/
│   │   ├── questions.json
│   │   └── results.json
├── AGENTS.md
└── README.md
```

💡 Tips
	•	キャラ画像は著作権管理に注意（非公開 or ライセンス取得が前提）
	•	スマホユーザーの滞在時間・直感的なUXを最優先に設計
	•	診断結果にユーモア・共感要素を加えるとSNSシェア率UP
	•	UIに「診断結果をコピペ」できるボタンを設けるとシェア促進につながる

✨ Future Ideas
	•	カスタム診断モード（恋愛特化 / 仕事特化）
	•	相性診断（友達・恋人ペア診断）
	•	月替わりキャラコメント（期間限定セリフ追加）
	•	LINE連携（診断結果をBotが返信）


🤖 Codex Execution
	•	LLM連携やデータベースは不要
	•	AGENTS.md の情報に基づいて results.json を生成するモデルが実装可能

🧾 License / 注意点

このアプリは非公式のファン作品として企画されており、商用利用・キャラ画像使用にはサンリオ社の許諾が必要です。
公開前にライセンスガイドラインの確認を強く推奨します。


# Repository Guidelines

## プロジェクト構成とモジュール整理
- Next.js / React の画面は App Router を基本とし `app/` に配置、レガシーなページは `pages/` に残す場合は明示的にコメントします。
- 共有 UI コンポーネントは `src/components/`、カスタムフックは `src/hooks/`、ドメイン機能は `src/features/<feature>` にまとめ、ユーティリティは `src/lib/` に限定します。
- Node.js 側のハンドラやジョブは `server/` 以下で `routes/`, `services/`, `jobs/` に分け、環境変数サンプルを `.env.example` で同期します。
- 静的アセットは `public/` に置き、テストコードは同じ階層構造で `tests/` にミラー配置して import パスを一定に保ちます。

## ビルド・テスト・開発コマンド
- `npm install` で依存を復元し、`npm run prepare` で Husky フックを有効化します。
- `npm run dev` が Next.js の開発サーバ、`npm run dev:api` がローカル API モックです。両方起動した状態で動作確認します。
- `npm run build` で本番バンドルを生成し、`npm run start` で Node.js 上から配信します。
- 静的解析は `npm run lint`、型検査は `npm run type-check`、フォーマットは `npm run format` を使用します。
- 単体 / 結合テストは `npm run test`（Jest or Vitest）、E2E は `npm run e2e`（Playwright）。ブラウザ依存ファイルが無い場合は `npx playwright install` を一度実行します。

## コーディングスタイルと命名
- Prettier で 2 space indent + semicolon + single quote を強制し、手動整形は避けます。
- ESLint の警告はゼロを維持し、例外は `.eslintrc` に理由付きで限定的に追加します。
- ファイル命名はコンポーネントを `PascalCase.tsx`、ヘルパーを `camelCase.ts`、定数を `SCREAMING_SNAKE_CASE` に統一します。
- React では hooks で状態管理し、副作用は `useEffect` で明示し、ビジネスロジックは `src/features` に閉じ込めます。

## テスト指針
- ユニットとコンポーネントは `tests/<path>.test.tsx` 形式でテストし、`describe` と `it` で挙動を日本語で表現します。
- API 向けは `tests/server/` に配置し、外部サービスは `msw` もしくは `nock` でモックします。
- Playwright シナリオは `tests/e2e/` に置き、最小限のスモークケースを保守。重大バグは再発防止シナリオを追加します。
- レビュー前には `npm run lint`, `npm run type-check`, `npm run test`, `npm run e2e` をすべて通し、結果を PR に記載します。

## コミットとプルリクエスト
- Conventional Commits (`feat: ...`, `fix: ...`, `chore: ...`) の imperative 形式でメッセージを記述し、論理単位ごとにコミットします。
- PR では目的、ユーザー影響、主要な変更点、実施テスト、UI 変化のスクリーンショットをテンプレートで埋めます。
- 依存追加時はライセンスとバンドルサイズをチェックし、必要に応じて `docs/architecture.md` や `docs/release-notes/` を更新します。
- レビューコメントには対応状況を emoji で明示し（`✅ done`, `📝 follow-up` など）、未解決の懸念を残さないようにします。

## 設定とセキュリティ
- 環境変数は `.env.local` で管理し、共有が必要な値は `.env.example` に追記してから Slack で周知します。
- シークレットはバージョン管理外の Secret Manager に保存し、漏洩時は即ローテーションして事後対応を `docs/incident-response.md` に記録します。
- ローカル初回セットアップ後は `npm run setup:dev`（将来導入予定）で DB seed や初期データ準備を自動化する想定です。
- ステージングへのデプロイは `main` マージで自動、本番手動リリースでは `npm run build` 成果物をアーティファクト化し、Infra 提供のスクリプトを実行します。
