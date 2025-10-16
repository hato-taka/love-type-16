import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="quiz-shell" style={{ maxWidth: '640px' }}>
      <div className="quiz-content">
        <span className="quiz-badge">404 Not Found</span>
        <h1 style={{ fontSize: '2.2rem', marginTop: '24px', marginBottom: '12px' }}>
          ページが見つかりません
        </h1>
        <p style={{ lineHeight: 1.7, marginBottom: '24px' }}>
          指定された診断結果が存在しないか、URL が間違っています。トップページからもう一度診断を始めてください。
        </p>
        <Link className="btn" href="/">
          トップへ戻る
        </Link>
      </div>
    </div>
  );
}
