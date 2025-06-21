import type {
  CellType,
  CoordinatesType,
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
