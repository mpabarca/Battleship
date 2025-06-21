export type CoordinatesType = [number, number];
export type OrientationType = "horizontal" | "vertical";
export type DirectionType = "up" | "right" | "down" | "left";
export type ShipSizeType = 4 | 5;

export type CellType = {
  cellId: number;
  coordinates: CoordinatesType;
  shot: boolean;
  shipId: number | null;
};

export type GridLayoutType = CellType[][];

export type GridType = {
  layout: GridLayoutType;
  ships: ShipType[];
  sunkShips: ShipType[];
  endGame: boolean;
};

export type ShipType = {
  shipId: number;
  length: number;
  sunk: boolean;
  shotCounter: 0;
  direction: DirectionType;
  cells: CellType[];
};
