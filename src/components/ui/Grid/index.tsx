import type { GridType } from "../../../types";
import { COLUMNS_HEADER, ROWS_HEADER } from "../../../utils/game";
import Cell from "../Cell";

interface IGrid {
  grid: GridType;
}

function Grid ({ grid }: IGrid) {
  // grid-cols-10 => GRID_SIZE[0]
  // grid-rows-10 => GRID_SIZE[1]

  return(
    <div className="flex border border-zinc-600 p-14">
      <div>
        <div className="w-14 h-14">
          {""}
        </div>
          {ROWS_HEADER.map((row) => (
            <div key={`${row}-header`} className="w-14 h-14 flex justify-center items-center">
              {row}
            </div>
          ))}
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row">
          {COLUMNS_HEADER.map((col) => (
            <div key={`${col}-header`} className="h-14 w-14 flex justify-center items-center">
              {col}
            </div>
          ))}
        </div>
        <div className="grid grid-rows-10 border border-zinc-600">
          {grid.layout.map((row, rowIndex) => (
            <div key={rowIndex} className={`grid gap-0 grid-cols-10`}>
              {row.map((cell, columnIndex) => (<Cell key={columnIndex} cell={cell} />))}
            </div>
            ))
          }
        </div>
        <div className="flex flex-row">
          {COLUMNS_HEADER.map((col) => (
            <div key={`${col}-header`} className="h-14 w-14 flex justify-center items-center">
              {col}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="w-14 h-14">
          {""}
        </div>
        {ROWS_HEADER.map((row) => (
          <div key={`${row}-header`} className="w-14 h-14 flex justify-center items-center">
            {row}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Grid;