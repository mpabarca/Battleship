import type { DirectionType } from "../types";
import { getRandomInt, shuffleArray } from "./general";


describe('getRandomInt', () => {
  it('Returns a number between min and max inclusive', () => {
    for (let i = 0; i < 100; i++) {
      const value = getRandomInt(1, 5);
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(5);
    }
  })
  it('returns min when min === max', () => {
    expect(getRandomInt(3, 3)).toBe(3);
  });

  it('always returns an integer', () => {
    for (let i = 0; i < 100; i++) {
      const value = getRandomInt(10, 20);
      expect(Number.isInteger(value)).toBe(true);
    }
  });

  it('works with negative numbers', () => {
    for (let i = 0; i < 100; i++) {
      const value = getRandomInt(-5, 5);
      expect(value).toBeGreaterThanOrEqual(-5);
      expect(value).toBeLessThanOrEqual(5);
    }
  });
});

describe('shuffleArray', () => {
  const original: DirectionType[] = ["up", "right", "down", "left"];

  it('returns the same elements, in any order', () => {
    const shuffled = shuffleArray([...original]);
    // Sort and compare to ensure values are unchanged
    expect(shuffled.sort()).toEqual(original.sort());
  });
  it('handles an empty array without error', () => {
    expect(shuffleArray([])).toEqual([]);
  });
  it('returns a new array with same length', () => {
    const shuffled = shuffleArray([...original]);
    expect(shuffled).toHaveLength(original.length);
  });
  it('returns a different order (most of the time)', () => {
    let shuffledSame = true;
    for (let i = 0; i < 10; i++) {
      const shuffled = shuffleArray([...original]);
      if (shuffled.join('') !== original.join('')) {
        shuffledSame = false;
        break;
      }
    }
    expect(shuffledSame).toBe(false);
  });
})
