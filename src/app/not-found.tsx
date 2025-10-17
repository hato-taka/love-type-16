import Link from 'next/link';
import { SurfaceShell } from '@/components/ui/SurfaceShell';
import { Badge } from '@/components/ui/Badge';
import { buttonClass } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <SurfaceShell className="max-w-xl text-center" contentClassName="space-y-6">
      <Badge>404 Not Found</Badge>
      <h1 className="text-[clamp(1.8rem,6.5vw,2.2rem)] font-semibold leading-tight">
        ページが見つかりません
      </h1>
      <p className="text-[clamp(0.95rem,3.2vw,1.05rem)] leading-7 text-candy-lavender">
        指定された診断結果が存在しないか、URL が間違っています。トップページからもう一度診断を始めてください。
      </p>
      <Link className={buttonClass()} href="/">
        トップへ戻る
      </Link>
    </SurfaceShell>
  );
}
