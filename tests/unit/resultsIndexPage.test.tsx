import React from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import type { PersonalityResult } from '@/types/quiz';

const mockGetAllResults = vi.fn((): PersonalityResult[] => []);

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: { src: string; alt: string }) => {
    const { src, alt, ...rest } = props as Record<string, unknown>;
    const { fill: _fill, sizes: _sizes, unoptimized: _unoptimized, ...imgProps } = rest;

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src as string} alt={alt as string} data-testid="mock-next-image" {...imgProps} />
    );
  }
}));

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
    prefetch: _prefetch,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    prefetch?: boolean;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  )
}));

vi.mock('@/lib/quiz', () => ({
  getAllResults: () => mockGetAllResults()
}));

// モックデータ生成ヘルパー
function createResult(overrides: Partial<PersonalityResult> = {}): PersonalityResult {
  return {
    type: 'SCA-T',
    character: 'テストキャラ',
    title: 'テストタイトル',
    summary: 'キャッチーな要約テキスト',
    description: {
      workStyle: '仕事観',
      loveView: '恋愛観',
      marriageView: '結婚観',
      lifeView: '人生観',
      oshiStyle: '推し活観'
    },
    image: 'results/test.png',
    shareImageUrl: 'https://cdn.example.com/test.png',
    ...overrides
  };
}

beforeEach(() => {
  mockGetAllResults.mockReset();
});

describe('ResultsIndexPage', () => {
  it('renders stable markup for the results collection', async () => {
    mockGetAllResults.mockReturnValue([
      createResult({ type: 'SAA-T', character: 'キキ', summary: '冒険心旺盛なクリエイター' }),
      createResult({
        type: 'IAF-Q',
        character: 'あひるのペックル',
        shareImageUrl: undefined,
        image: 'results/pekkle.png'
      })
    ]);

    const { default: ResultsIndexPage } = await import('@/app/results/page');
    const html = renderToStaticMarkup(<ResultsIndexPage />);

    expect(html).toMatchSnapshot();
  });
});
