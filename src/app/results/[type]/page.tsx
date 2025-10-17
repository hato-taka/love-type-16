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
  const isPlaceholder =
    Object.values(description).some((value) => value.includes('（仮）')) || character.includes('仮');

  return (
    <div className="relative mx-auto my-6 w-full max-w-4xl overflow-hidden rounded-[26px] bg-white/90 px-5 py-8 shadow-pop sm:my-12 sm:px-10 sm:py-12">
      <div className="pointer-events-none absolute -left-28 -top-32 h-64 w-64 rounded-full bg-candy-base/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-36 -right-28 h-72 w-72 rounded-full bg-candy-accent/20 blur-3xl" aria-hidden />

      <div className="relative z-10 space-y-8">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-candy-base/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-candy-base sm:text-sm">
          結果タイプ：{type}
        </span>
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
            {Object.entries(description).map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-white/85 p-5 shadow-pop">
                <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-candy-lavender">
                  {label}
                </dt>
                <dd className="pt-2 text-sm leading-7 text-candy-plum sm:text-base">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <Link className="inline-flex items-center justify-center rounded-full bg-candy-base px-6 py-3 text-sm font-semibold text-white shadow-pop transition duration-200 hover:-translate-y-0.5 hover:shadow-popHover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-candy-base/60 sm:px-8 sm:py-3.5 sm:text-base" href="/">
            もう一度診断する
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-full border border-candy-lavender/30 bg-white/90 px-6 py-3 text-sm font-semibold text-candy-lavender transition duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-candy-accent/40 sm:px-8 sm:py-3.5 sm:text-base"
            href="/share"
            prefetch={false}
          >
            結果をシェアする（準備中）
          </Link>
        </div>
      </div>
    </div>
  );
}
