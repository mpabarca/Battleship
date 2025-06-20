export type CoordinatesType = [number, number];
export type OrientationType = "horizontal" | "vertical";
export type DirectionType = "up" | "right" | "down" | "left";
export type ShipSizeType = 4 | 5;

export type CellType = {
  shipId: number;
  shot: boolean;
  coordinates: CoordinatesType;
};

export type GridType = {
  layout: CellType | null [][];
};

export type ShipType = {
  shipId: number;
  length: number;
  sunk: boolean;
  shotCounter: 0;
  direction: DirectionType;
  cells: CellType[];
};
