import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="relative mx-auto my-6 w-full max-w-xl overflow-hidden rounded-[26px] bg-white/90 px-5 py-8 shadow-pop sm:my-12 sm:px-8 sm:py-10">
      <div className="pointer-events-none absolute -left-24 -top-28 h-52 w-52 rounded-full bg-candy-base/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-28 -right-24 h-60 w-60 rounded-full bg-candy-accent/20 blur-3xl" aria-hidden />

      <div className="relative z-10 space-y-6 text-center">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-candy-base/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-candy-base sm:text-sm">
          404 Not Found
        </span>
        <h1 className="text-[clamp(1.8rem,6.5vw,2.2rem)] font-semibold leading-tight">
          ページが見つかりません
        </h1>
        <p className="text-[clamp(0.95rem,3.2vw,1.05rem)] leading-7 text-candy-lavender">
          指定された診断結果が存在しないか、URL が間違っています。トップページからもう一度診断を始めてください。
        </p>
        <Link
          className="inline-flex items-center justify-center rounded-full bg-candy-base px-6 py-3 text-sm font-semibold text-white shadow-pop transition duration-200 hover:-translate-y-0.5 hover:shadow-popHover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-candy-base/60 sm:px-8 sm:py-3.5 sm:text-base"
          href="/"
        >
          トップへ戻る
        </Link>
      </div>
    </div>
  );
}
