import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllResults, findResultByType } from '@/lib/quiz';
import { Badge } from '@/components/ui/Badge';
import { SurfaceShell } from '@/components/ui/SurfaceShell';
import { buttonClass } from '@/components/ui/button';

function ResultDetail({ label, value }: { label: string; value?: string }) {
  if (!value) {
    return null;
  }

  return (
    <div className="rounded-2xl bg-white/85 p-5 shadow-pop">
      <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-candy-lavender">
        {label}
      </dt>
      <dd className="pt-2 text-sm leading-7 text-candy-plum sm:text-base">{value}</dd>
    </div>
  );
}

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

  const title = `${result.character}タイプ | サンリオ恋愛性格診断`;
  const description = `${result.character}タイプ（${result.title}）の診断結果です。`;
  const imageUrl = result.shareImageUrl ?? `/${result.image}`;
  const pageUrl = `/results/${result.type.toLowerCase()}`;

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
      url: pageUrl,
      images: [
        {
          url: imageUrl,
          alt: `${result.character}タイプの診断カード`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl]
    }
  };
}

export default function ResultPage({ params }: ResultPageProps) {
  const result = findResultByType(params.type);

  if (!result) {
    notFound();
  }

  const { character, title, description, image, type } = result!;
  const isPlaceholder =
    Object.values(description)
      .filter((value): value is string => typeof value === 'string')
      .some((value) => value.includes('（仮）')) || character.includes('仮');

  return (
    <SurfaceShell className="max-w-4xl px-5 py-8 sm:px-10 sm:py-12" contentClassName="space-y-8">
      <Badge>結果タイプ：{type}</Badge>
      <h1 className="text-[clamp(2rem,6.5vw,2.6rem)] font-semibold leading-tight">
        {character} タイプ
      </h1>
      <p className="text-[clamp(1rem,3.4vw,1.2rem)] text-candy-lavender">{title}</p>

      {isPlaceholder && (
        <div className="rounded-2xl border-2 border-dashed border-candy-base/40 bg-white/85 px-5 py-4 text-sm leading-relaxed text-candy-lavender">
          <strong className="block pb-1 text-base text-candy-base">このタイプは仮データです</strong>
          <span className="block text-[clamp(0.85rem,3vw,0.95rem)]">
            本番の文章やビジュアルが整い次第、results.json を更新してください。
          </span>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
        <div className="rounded-3xl bg-gradient-to-br from-white/90 via-white/70 to-candy-soft/70 p-6 shadow-pastel">
          <div className="relative aspect-square w-full overflow-hidden rounded-[22px]">
            <Image
              src={`/${image}`}
              alt={`${character} のイラスト`}
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-contain"
            />
          </div>
        </div>

        <dl className="grid gap-5">
          <ResultDetail label="働き方" value={description.workStyle} />
          <ResultDetail label="恋愛観" value={description.loveView} />
          <ResultDetail label="結婚観" value={description.marriageView} />
          <ResultDetail label="人生観" value={description.lifeView} />
          <ResultDetail label="推し活タイプ" value={description.oshiStyle} />
        </dl>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
        <Link className={buttonClass()} href="/">
          もう一度診断する
        </Link>
        <Link className={buttonClass({ variant: 'secondary' })} href="/share" prefetch={false}>
          結果をシェアする（準備中）
        </Link>
      </div>

      <div className="flex justify-center pt-6">
        <Link className={buttonClass({ variant: 'secondary' })} href="/results" prefetch={false}>
          全タイプの一覧を見る
        </Link>
      </div>
    </SurfaceShell>
  );
}
