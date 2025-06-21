import type { CellType, CoordinatesType, GridLayoutType, GridType, ShipSizeType, ShipType } from "../types";
import { sameCells } from "./cell";
import { generateShip } from "./ship";

const SHIPS_SIZES: ShipSizeType[] = [5, 4, 4]
/*
RULES:
1. Program creates a fix number of ships:
  - Within the range of the grid
  - Don't overlap to each other
  - With the following sizes:
    - 1x Battleship (5 cells)
    - 2x Destroyers (4 cells)

=> generateShip(): ShipType

2. Program creates 10 x 10 grid:
  - Columns A -> J where A: 1 , B: 2, ..., J: 10
  - Rows 1 -> 10
  - Places/stores the created ships

3. The game is a one-sided game where: 
  - Is play by a single human
  - Enters a coordinate on input field like A5 => [1,5]

4. Program check:
  - Input/coordinates has previously called => YOU ALREADY TRIED THIS COORDINATES, TRY AGAIN!
  - Input/coordinates called first time
    - Input !== some ship cell's coordinates => MISSES!
    - Input === some ship cell's coordinates => ship.shotCounter++ 
      - ship.shotCounter < ship.length => HITS!
      - ship.shotCounter === ship.length
        - ship.sunk = true => SINK!
        - sunkShips.push(ship)

5. Program check:
  - sunkShips.length = ships.length => GAME ENDS! USER WINS!
  - sunkShips.length < ships.length => repeat step 3
*/

export function generateGrid(): GridType {
  const ships: ShipType[] = []
  const grid: GridLayoutType = []

  // 1. Program creates a fix number of ships
  SHIPS_SIZES.forEach((shipLength, index) => {
    const ship: ShipType = generateShip(index + 1, shipLength, ships);
    ships.push(ship)
  })

  // 2. Program creates 10 x 10 grid
  for(let rowIndex = 1; rowIndex <= 10; rowIndex++){
    const row: CellType[] = [];
    for(let columnIndex = 1; columnIndex <= 10; columnIndex++){
      const cell: CellType = generateCell([rowIndex,columnIndex], ships);
      row.push(cell)
    }
    grid.push(row)
  }

  return {
    layout: grid,
    ships,
    sunkShips: []
  };
}
