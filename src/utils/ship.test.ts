import type { CoordinatesType, DirectionType, ShipType } from "../types";
import { existShipCellOverlap, getNextShipCellCoordinates, getRandomInt, sameCells, shuffleArray } from "./ship";

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

describe('sameCells', () => {
  it('returns true for identical coordinates', () => {
    const a: CoordinatesType = [2, 3];
    const b: CoordinatesType = [2, 3];
    expect(sameCells(a, b)).toBe(true);
  });

  it('returns false for different x values', () => {
    const a: CoordinatesType = [1, 3];
    const b: CoordinatesType = [2, 3];
    expect(sameCells(a, b)).toBe(false);
  });

  it('returns false for different y values', () => {
    const a: CoordinatesType = [2, 3];
    const b: CoordinatesType = [2, 4];
    expect(sameCells(a, b)).toBe(false);
  });

  it('returns false for different x and y values', () => {
    const a: CoordinatesType = [1, 2];
    const b: CoordinatesType = [3, 4];
    expect(sameCells(a, b)).toBe(false);
  });
})

describe('existShipCellOverlap', () => {
  const mockShips: ShipType[] = [
    {
      shipId: 1,
      length: 4,
      sunk: false,
      shotCounter: 0,
      direction: 'right',
      cells: [
        { shipId: 1, shot: false, coordinates: [1, 1] },
        { shipId: 1, shot: false, coordinates: [1, 2] },
        { shipId: 1, shot: false, coordinates: [1, 3] },
        { shipId: 1, shot: false, coordinates: [1, 4] },
      ]
    },
    {
      shipId: 2,
      length: 4,
      sunk: false,
      shotCounter: 0,
      direction: 'down',
      cells: [
        { shipId: 2, shot: false, coordinates: [3, 3] },
        { shipId: 2, shot: false, coordinates: [4, 3] },
        { shipId: 2, shot: false, coordinates: [5, 3] },
        { shipId: 2, shot: false, coordinates: [6, 3] },
      ]
    }
  ];

  it('returns true if the new cell overlaps with an existing ship cell', () => {
    expect(existShipCellOverlap(mockShips, [1, 2])).toBe(true);
    expect(existShipCellOverlap(mockShips, [5, 3])).toBe(true);
  });

  it('returns false if the new cell does not overlap with any ship cell', () => {
    expect(existShipCellOverlap(mockShips, [0, 0])).toBe(false);
    expect(existShipCellOverlap(mockShips, [7, 3])).toBe(false);
  });

  it('returns false when shipsCreated is an empty array', () => {
    expect(existShipCellOverlap([], [1, 1])).toBe(false);
  });
});

describe('getNextShipCellCoordinates', () => {
  const start: CoordinatesType = [5, 5];

  it('returns correct coordinate when moving up within bounds', () => {
    expect(getNextShipCellCoordinates(start, 2, 'up')).toEqual([5, 3]);
  });

  it('returns null when moving up out of bounds', () => {
    expect(getNextShipCellCoordinates([3, 1], 2, 'up')).toBeNull();
  });

  it('returns correct coordinate when moving down within bounds', () => {
    expect(getNextShipCellCoordinates(start, 3, 'down')).toEqual([5, 8]);
  });

  it('returns null when moving down out of bounds', () => {
    expect(getNextShipCellCoordinates([4, 9], 2, 'down')).toBeNull();
  });

  it('returns correct coordinate when moving right within bounds', () => {
    expect(getNextShipCellCoordinates(start, 2, 'right')).toEqual([7, 5]);
  });

  it('returns null when moving right out of bounds', () => {
    expect(getNextShipCellCoordinates([9, 6], 2, 'right')).toBeNull();
  });

  it('returns correct coordinate when moving left within bounds', () => {
    expect(getNextShipCellCoordinates(start, 3, 'left')).toEqual([2, 5]);
  });

  it('returns null when moving left out of bounds', () => {
    expect(getNextShipCellCoordinates([2, 8], 3, 'left')).toBeNull();
  });
});