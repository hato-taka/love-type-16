import { SurfaceShell } from '@/components/ui/SurfaceShell';
import { Badge } from '@/components/ui/Badge';

export default function SharePage() {
  return (
    <SurfaceShell className="max-w-xl" contentClassName="space-y-6">
      <Badge>COMING SOON</Badge>
      <h1 className="text-[clamp(1.8rem,6.5vw,2.2rem)] font-semibold leading-tight">
        シェア機能は準備中です
      </h1>
      <p className="text-[clamp(0.95rem,3.4vw,1.05rem)] leading-7 text-candy-lavender">
        診断結果を画像として保存したり、SNS でシェアできる機能を開発中です。実装されるまでは、お手数ですがスクリーンショットで共有してください。
      </p>
    </SurfaceShell>
  );
}
