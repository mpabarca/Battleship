import type { CoordinatesType, ShipType } from "../types";
import { existShipCellOverlap, getNextShipCellCoordinates } from "./ship";

describe('existShipCellOverlap', () => {
  const mockShips: ShipType[] = [
    {
      shipId: 1,
      length: 4,
      sunk: false,
      shotCounter: 0,
      direction: 'right',
      cells: [
        { cellId: 11, shipId: 1, shot: false, coordinates: [1, 1] },
        { cellId: 12,shipId: 1, shot: false, coordinates: [1, 2] },
        { cellId: 13,shipId: 1, shot: false, coordinates: [1, 3] },
        { cellId: 14,shipId: 1, shot: false, coordinates: [1, 4] },
      ]
    },
    {
      shipId: 2,
      length: 4,
      sunk: false,
      shotCounter: 0,
      direction: 'down',
      cells: [
        { cellId: 33,shipId: 2, shot: false, coordinates: [3, 3] },
        { cellId: 43,shipId: 2, shot: false, coordinates: [4, 3] },
        { cellId: 53,shipId: 2, shot: false, coordinates: [5, 3] },
        { cellId: 63,shipId: 2, shot: false, coordinates: [6, 3] },
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