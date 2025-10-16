import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllResults, findResultByType } from '@/lib/quiz';

interface ResultPageProps {
  params: { type: string };
}

export function generateStaticParams() {
  return getAllResults().map((result) => ({ type: result.type.toLowerCase() }));
}

export function generateMetadata({ params }: ResultPageProps) {
  const result = findResultByType(params.type);

  if (!result) {
    return {
      title: '診断結果が見つかりません'
    };
  }

  return {
    title: `${result.character}タイプ | サンリオ恋愛性格診断`,
    description: `${result.character}タイプ（${result.title}）の診断結果です。`
  };
}

export default function ResultPage({ params }: ResultPageProps) {
  const result = findResultByType(params.type);

  if (!result) {
    notFound();
  }

  const { character, title, description, image, type } = result!;
  const isPlaceholder = Object.values(description).some((value) => value.includes('（仮）')) || character.includes('仮');

  return (
    <div className="quiz-shell" style={{ maxWidth: '980px' }}>
      <div className="quiz-content">
        <span className="quiz-badge">結果タイプ：{type}</span>
        <h1 style={{ fontSize: '2.6rem', marginTop: '24px', marginBottom: '16px' }}>
          {character} タイプ
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '28px', color: 'var(--color-subtle)' }}>{title}</p>

        {isPlaceholder && (
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              borderRadius: '18px',
              padding: '16px 20px',
              marginBottom: '24px',
              border: '2px dashed rgba(255, 111, 183, 0.4)'
            }}
          >
            <strong style={{ display: 'block', marginBottom: '6px' }}>このタイプは仮データです</strong>
            <span style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
              本番の文章やビジュアルが整い次第、`results.json` を更新してください。
            </span>
          </div>
        )}

        <div
          style={{
            display: 'grid',
            gap: '32px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,240,250,0.8))',
              borderRadius: '24px',
              padding: '24px',
              boxShadow: '0 18px 35px rgba(143, 211, 254, 0.28)'
            }}
          >
            <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', borderRadius: '20px', overflow: 'hidden' }}>
              <Image
                src={`/${image}`}
                alt={`${character} のイラスト`}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>

          <dl
            style={{
              display: 'grid',
              gap: '20px',
              margin: 0
            }}
          >
            {Object.entries(description).map(([label, value]) => (
              <div
                key={label}
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '20px',
                  padding: '18px 22px',
                  boxShadow: '0 10px 24px rgba(255, 111, 183, 0.18)'
                }}
              >
                <dt style={{ fontSize: '0.85rem', letterSpacing: '0.08em', color: 'var(--color-subtle)', marginBottom: '6px' }}>
                  {label}
                </dt>
                <dd style={{ margin: 0, lineHeight: 1.7 }}>{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div style={{ marginTop: '40px', display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
          <Link className="btn" href="/">
            もう一度診断する
          </Link>
          <Link className="btn btn-secondary" href="/share" prefetch={false}>
            結果をシェアする（準備中）
          </Link>
        </div>
      </div>
    </div>
  );
}
