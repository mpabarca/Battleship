import type {
  CellType,
  CoordinatesType,
  GridLayoutType,
  ShipType,
} from "../types";
import { getCellShipId } from "./ship";

export function sameCells(cell1: CoordinatesType, cell2: CoordinatesType) {
  return cell1[0] === cell2[0] && cell1[1] === cell2[1]
}

export function generateCellBasedOnGrid( cellCoordinates: CoordinatesType, ships: ShipType[]): CellType {
  return {
    cellId: parseInt(`${cellCoordinates[0]}${cellCoordinates[1]}`),
    coordinates: cellCoordinates,
    shot: false,
    shipId: getCellShipId(ships, cellCoordinates),
  }
}

export function hasCellBeenShot(cell: CoordinatesType, grid: GridLayoutType): boolean {
  return grid[cell[1] - 1][cell[0] - 1].shot
}