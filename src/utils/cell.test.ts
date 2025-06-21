import type { CoordinatesType } from "../types";
import { sameCells } from "./cell";

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
