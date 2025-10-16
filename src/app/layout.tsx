import type { Metadata } from 'next';
import { Zen_Maru_Gothic } from 'next/font/google';
import './globals.css';

const zenMaruGothic = Zen_Maru_Gothic({
  subsets: ['latin'],
  weight: ['300', '500', '700'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Sanrio Personality Checker',
  description:
    '16問でわかるサンリオ恋愛性格診断。4軸の傾向からあなたにぴったりのキャラクタータイプを提案します。',
  icons: {
    icon: '/favicon.ico'
  }
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja" className={zenMaruGothic.className}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
