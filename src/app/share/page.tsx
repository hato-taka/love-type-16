export default function SharePage() {
  return (
    <div className="relative mx-auto my-6 w-full max-w-xl overflow-hidden rounded-[26px] bg-white/90 px-5 py-8 shadow-pop sm:my-12 sm:px-8 sm:py-10">
      <div className="pointer-events-none absolute -left-24 -top-28 h-52 w-52 rounded-full bg-candy-base/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-28 -right-24 h-60 w-60 rounded-full bg-candy-accent/20 blur-3xl" aria-hidden />

      <div className="relative z-10 space-y-6">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-candy-base/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-candy-base sm:text-sm">
          COMING SOON
        </span>
        <h1 className="text-[clamp(1.8rem,6.5vw,2.2rem)] font-semibold leading-tight">
          シェア機能は準備中です
        </h1>
        <p className="text-[clamp(0.95rem,3.4vw,1.05rem)] leading-7 text-candy-lavender">
          診断結果を画像として保存したり、SNS でシェアできる機能を開発中です。実装されるまでは、お手数ですがスクリーンショットで共有してください。
        </p>
      </div>
    </div>
  );
}
