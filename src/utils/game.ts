import type {
  CellType,
  CoordinatesType,
  GridLayoutType,
  GridType,
  ShipSizeType,
  ShipType,
  ShootType,
} from "../types";
import { generateCellBasedOnGrid, sameCells } from "./cell";
import { ALPHABET, getConsecutivesIntArrayBySize } from "./general";
import { generateShip } from "./ship";

export const SHIPS_SIZES: ShipSizeType[] = [5, 4, 4];
export const GRID_SIZE: [number, number] = [10, 10]; // [column X, row Y]

export const ROWS_HEADER: number[] = getConsecutivesIntArrayBySize(
  GRID_SIZE[0]
);
export const COLUMNS_HEADER: string[] = ALPHABET.slice(0, GRID_SIZE[0]);

/*
RULES:
✔ 1. Program creates a fix number of ships:
  - Within the range of the grid
  - Don't overlap to each other
  - With the following sizes:
    - 1x Battleship (5 cells)
    - 2x Destroyers (4 cells)

=> generateShip(): ShipType

✔ 2. Program creates 10 x 10 grid:
  - Columns A -> J where A: 1 , B: 2, ..., J: 10
  - Rows 1 -> 10
  - Places/stores the created ships

✔ 3. The game is a one-sided game where: 
  - Is play by a single human
  - Enters a coordinate on input field like A5 => [1,5]

✔ 4. Program check:
  - Input/coordinates has previously called => YOU ALREADY TRIED THIS COORDINATES, TRY AGAIN!
  - Input/coordinates called first time
    - Input !== some ship cell's coordinates => MISSES!
    - Input === some ship cell's coordinates => ship.shotCounter++ 
      - ship.shotCounter < ship.length => HITS!
      - ship.shotCounter === ship.length
        - ship.sunk = true => SINK!
        - sunkShips.push(ship)

✔ 5. Program check:
  - sunkShips.length = ships.length => GAME ENDS! USER WINS!
  - sunkShips.length < ships.length => repeat step 3
*/

export function transformLetterToNumber(letter: string): number {
  return ALPHABET.indexOf(letter.toUpperCase()) + 1;
}
export function transformNumberToLetter(number: number): string {
  return ALPHABET[number - 1];
}

export function generateGrid(): GridType {
  const ships: ShipType[] = [];
  const grid: GridLayoutType = [];

  // 1. Program creates a fix number of ships
  SHIPS_SIZES.forEach((shipLength, index) => {
    const ship: ShipType = generateShip(index + 1, shipLength, ships);
    ships.push(ship);
  });

  // 2. Program creates 10 x 10 grid
  for (let rowIndex = 1; rowIndex <= GRID_SIZE[1]; rowIndex++) {
    const row: CellType[] = [];
    for (let columnIndex = 1; columnIndex <= GRID_SIZE[0]; columnIndex++) {
      const cell: CellType = generateCellBasedOnGrid(
        [columnIndex, rowIndex],
        ships
      );
      row.push(cell);
    }
    grid.push(row);
  }

  return {
    layout: grid,
    ships,
    sunkShips: [],
    endGame: false,
    showShips: false,
    errors: {
      columnCriteria: false,
      rowCriteria: false,
      emptyField: false,
      hasCellBeenShot: false,
    },
  };
}

export function getShotResult(
  grid: GridType,
  shotCoordinates: CoordinatesType
): {grid: GridType, shootType: ShootType} {
  const [x, y] = shotCoordinates;
  let shootType: ShootType = "miss"; //by default
  // Deep clone but detached from original
  const gridAfterImpact: GridType = structuredClone(grid);
  const cellAfterImpact: CellType = gridAfterImpact.layout[y - 1][x - 1];
  // Mark the impacted cell as shot
  gridAfterImpact.layout[y - 1][x - 1] = {
    ...cellAfterImpact,
    shot: true,
  };
  // Check if a ship was hit
  if (cellAfterImpact.shipId) {
    const shipAfterImpact: ShipType =
      gridAfterImpact.ships[cellAfterImpact.shipId - 1];
    shipAfterImpact.shotCounter++;
    shootType = "hit";

    // Update the shot cell inside the ship's cells
    for (let i = 0; i < shipAfterImpact.cells.length; i++) {
      const cell = shipAfterImpact.cells[i];
      if (sameCells(shotCoordinates, cell.coordinates)) {
        shipAfterImpact.cells[i] = {
          ...cell,
          shot: true,
        };
        break;
      }
    }

    // Check if the ship is sunk
    if (shipAfterImpact.shotCounter === shipAfterImpact.length) {
      shipAfterImpact.sunk = true;
      gridAfterImpact.sunkShips.push(shipAfterImpact);
      shootType = "sink";

      // Mark each cell in the layout as shipSunk (with updated object)
      for (let i = 0; i < shipAfterImpact.cells.length; i++) {
        const [x, y] = shipAfterImpact.cells[i].coordinates;
        gridAfterImpact.layout[y - 1][x - 1] = {
          ...gridAfterImpact.layout[y - 1][x - 1],
          shipSunk: true,
        };
      }
    }   

    // Check if game ends
    if (
      shipAfterImpact.shotCounter === shipAfterImpact.length &&
      gridAfterImpact.sunkShips.length === gridAfterImpact.ships.length
    )
      gridAfterImpact.endGame = true;
  }

  return {grid: gridAfterImpact, shootType};
}
