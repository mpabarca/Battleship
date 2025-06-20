import type { GridType } from "../../../types";
import { generateGrid } from "../../../utils/game";
import Cell from "../Cell";

function Grid () {
  const grid: GridType = generateGrid()

  return(
    <div className="border border-zinc-600 p-14">
      <div className="grid grid-rows-10 border border-zinc-600">
        {grid.layout.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-10">
            {row.map((cell, columnIndex) => (<Cell key={columnIndex} cell={cell} />))}
          </div>
          ))
        }
      </div>
    </div>
  )
}

export default Grid;