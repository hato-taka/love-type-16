import Image from 'next/image';
import Link from 'next/link';
import { SurfaceShell } from '@/components/ui/SurfaceShell';
import { getAllResults } from '@/lib/quiz';

export const metadata = {
  title: '全16タイプの一覧 | サンリオ恋愛性格診断',
  description: '16タイプのサンリオキャラクター診断結果をまとめて閲覧できます。気になるタイプをチェックして詳細ページへアクセスしましょう。'
};

export default function ResultsIndexPage() {
  const sortedResults = [...getAllResults()].sort((a, b) => a.type.localeCompare(b.type));

  return (
    <SurfaceShell className="max-w-5xl px-5 py-8 sm:px-10 sm:py-12" contentClassName="space-y-10">
      <header className="space-y-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-candy-lavender">
          Personality Library
        </p>
        <h1 className="text-[clamp(2rem,7vw,2.8rem)] font-semibold text-candy-plum">
          全16タイプのサンリオキャラ診断一覧
        </h1>
        <p className="mx-auto max-w-3xl text-sm leading-relaxed text-candy-lavender">
          診断タイプごとのキャラクター、肩書き、サマリーをまとめています。興味のあるタイプを選んで詳細ページで性格傾向を深掘りしましょう。
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedResults.map((entry) => {
          const slug = entry.type.toLowerCase();
          const imageSrc = entry.shareImageUrl ?? `/${entry.image}`;
          const useUnoptimized = entry.shareImageUrl?.startsWith('http') ?? false;

          return (
            <Link
              key={entry.type}
              href={`/results/${slug}`}
              className="group flex h-full flex-col gap-4 rounded-3xl bg-white/90 p-5 text-left shadow-pop transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-candy-base/60 hover:-translate-y-0.5 hover:shadow-popHover"
              prefetch={false}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#fff7fb] via-[#ffe3f1] to-[#d7f2ff]">
                <Image
                  src={imageSrc}
                  alt={`${entry.character} のイラスト`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 220px"
                  className="object-contain transition-transform duration-200 group-hover:scale-[1.04]"
                  unoptimized={useUnoptimized}
                />
              </div>

              <div className="space-y-2">
                <span className="inline-flex items-center rounded-full bg-candy-base/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-candy-lavender">
                  {entry.type}
                </span>
                <h2 className="text-xl font-semibold leading-tight text-candy-plum">{entry.character}</h2>
                <p className="text-sm leading-relaxed text-candy-lavender/90">
                  {entry.summary ?? entry.title}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </SurfaceShell>
  );
}
