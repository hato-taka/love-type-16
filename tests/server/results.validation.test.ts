import { describe, expect, it } from 'vitest';
import { getAllResults } from '@/lib/quiz';

describe('results dataset', () => {
  it('contains 16 personality entries', () => {
    expect(getAllResults()).toHaveLength(16);
  });
});
