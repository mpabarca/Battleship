import type { GridType } from "../../../types";
import { generateGrid, GRID_SIZE } from "../../../utils/game";
import { ALPHABET, getConsecutivesIntArrayBySize } from "../../../utils/general";
import Cell from "../Cell";

function Grid () {
  const grid: GridType = generateGrid()
  const columnsHeader: number[] = getConsecutivesIntArrayBySize(GRID_SIZE[0])

  return(
    <div className="flex border border-zinc-600 p-14">
      <div>
        <div className="w-14 h-14">
          {""}
        </div>
        {grid.layout.map((_, rowIndex) => (
          <div key={`${rowIndex}-header`} className="h-14 w-14 flex justify-center items-center">
            {ALPHABET[rowIndex]}
          </div>
          ))
        }
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row">
          {columnsHeader.map((col) => (
            <div key={`${col}-header`} className="w-14 h-14 flex justify-center items-center">
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
          {columnsHeader.map((col) => (
            <div key={`${col}-header`} className="w-14 h-14 flex justify-center items-center">
              {col}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="w-14 h-14">
          {""}
        </div>
        {grid.layout.map((_, rowIndex) => (
          <div key={`${rowIndex}-header`} className="h-14 w-14 flex justify-center items-center">
            {ALPHABET[rowIndex]}
          </div>
          ))
        }
      </div>
    </div>
  )
}

export default Grid;