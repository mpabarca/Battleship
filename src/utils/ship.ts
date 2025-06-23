import type {
  CoordinatesType,
  ShipType,
  CellType,
  DirectionType,
  ShipSizeType,
} from "../types";
import { sameCells } from "./cell";
import { GRID_SIZE } from "./game";
import { getRandomInt, shuffleArray } from "./general";
const DIRECTIONS: DirectionType[] = ["up", "right", "down", "left"]
// const ORIENTATIONS: OrientationType[] = ["horizontal", "vertical"];

/* 
RULES:
  Computer randomly places:
  •	1 Battleship of length 5
  •	2 Destroyers of length 4 each
  •	Ships are placed either horizontally or vertically, never diagonally
  •	Ships do not overlap and must stay within the grid

WORTH KNOWING:
The grid is an 1-indexed grid (1–10) NOT 0-indexed board (0–9)

*/

export function getCellShipId(ships: ShipType[], cellCoordinates: CoordinatesType): number | null {
  for(let i = 0; i < ships.length; i++) {
    for(let j = 0; j < ships[i].cells.length; j++){
      if(sameCells(cellCoordinates, ships[i].cells[j].coordinates)) return ships[i].shipId
    }
  }

  return null
}

export function existShipCellOverlap(shipsCreated: ShipType[], newShipCell: CoordinatesType): boolean {
  return shipsCreated.some((ship: ShipType) => 
    ship.cells.some((cell: CellType) => sameCells(cell.coordinates, newShipCell)
    )
  )
}

export function getNextShipCellCoordinates(
  firstCell: CoordinatesType,
  index: number,
  direction: DirectionType
): CoordinatesType | null {
  if (direction === "up") {
    return firstCell[1] - index > 0 ? [firstCell[0], firstCell[1] - index] : null;
  } else if (direction === "down") {
    return firstCell[1] + index <= GRID_SIZE[1] ? [firstCell[0], firstCell[1] + index] : null;
  } else if (direction === "right") {
    return firstCell[0] + index <= GRID_SIZE[0] ? [firstCell[0] + index, firstCell[1]] : null;
  } else {
    return firstCell[0] - index > 0 ? [firstCell[0] - index, firstCell[1]] : null;
  }
}

export function generateFirstCell(shipsCreated: ShipType[]): CoordinatesType {
let firstCell: CoordinatesType = [getRandomInt(1, GRID_SIZE[0]), getRandomInt(1, GRID_SIZE[1])];  while (existShipCellOverlap(shipsCreated, firstCell)) {
      firstCell = [getRandomInt(1, GRID_SIZE[0]), getRandomInt(1, GRID_SIZE[1])];
  }
  return firstCell
}

export function generateShipCells(shipId: number, firstCell: CoordinatesType, size: ShipSizeType, direction: DirectionType, shipsCreated: ShipType[]): CellType[] | null {
  const cells: CellType[] = [{
    cellId: parseInt(`${firstCell[0]}${firstCell[1]}`),
    shipId: shipId,
    shot: false,
    coordinates: firstCell,
    shipSunk: false,
  }]

  for (let i = 1; i < size; i++) {
    const nextCell: CoordinatesType | null = getNextShipCellCoordinates(firstCell, i, direction)
    if (nextCell && !existShipCellOverlap(shipsCreated, nextCell)) cells.push({
      cellId: parseInt(`${nextCell[0]}${nextCell[1]}`),
      shipId: shipId,
      shot: false,
      coordinates: nextCell,
      shipSunk: false
    })
    else {
      return null
    }
  }
  return cells
}


/*

1. Place first cell that:
  a. Can be any random number on rows [1 to 10] and columns [1 to 10]
  b. Don't overlap any existing ship
=> generateFirstCell() => return CoordinatesType

2. Check all possible directions (and the ship coordinates) that the ship can go that:
  a. Starts on firstCell => firstCell = generateFirstCell(shipsCreated)
  b. Fits in the layout 10 x 10
  c. Won't overlap with any existing ship on its extended size
  d. return null if there is no direction that the ship can be created without overlapping existing ships 
=> generateShipCells() => CellType[] | null

3. Return ship object (with initial values)
=> generateShip() => ShipType

*/

export function generateShip (shipId: number, size: ShipSizeType, shipsCreated: ShipType[]): ShipType {
  let shipCells: CellType[] = []
  let direction: DirectionType = "up"; //default direction
  const shuffleDirections: DirectionType[] = shuffleArray(DIRECTIONS) // Create shuffle on default direction to go to add spiciness to the game

  // If the firstCell generated cannot create a ship at any direction around (shipCells.length <= 0) => go again and generate a new firstCell
  while(shipCells.length <= 0) {
    const firstCell = generateFirstCell(shipsCreated)
    for(let i = 0; i < shuffleDirections.length; i++) {
      const cells = generateShipCells(shipId, firstCell, size, shuffleDirections[i], shipsCreated)
      if(Array.isArray(cells)) {
        shipCells = cells
        direction = shuffleDirections[i]
        break
      }
    }
  }

  return {
    shipId: shipId,
    sunk: false,
    length: size,
    shotCounter: 0,
    direction,
    cells: shipCells,
  };
}