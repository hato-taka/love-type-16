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
  metadataBase: new URL('https://sanrio-personality-checker.example'),
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: '/',
    title: 'Sanrio Personality Checker',
    description:
      '16問でわかるサンリオ恋愛性格診断。4軸の傾向からあなたにぴったりのキャラクタータイプを提案します。',
    siteName: 'Sanrio Personality Checker',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sanrio Personality Checker - サンリオ恋愛性格診断'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanrio Personality Checker',
    description:
      '16問でわかるサンリオ恋愛性格診断。4軸の傾向からあなたにぴったりのキャラクタータイプを提案します。',
    images: ['/og-image.png']
  },
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
