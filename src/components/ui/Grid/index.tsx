import type { GridType } from "../../../types";
import { generateGrid, GRID_SIZE } from "../../../utils/game";
import Cell from "../Cell";

function Grid () {
  const grid: GridType = generateGrid()
  const [columns, rows] = GRID_SIZE;

  return(
    <div className="border border-zinc-600 p-14">
      <div className={`grid gap-0 grid-rows-${rows} border border-zinc-600`}>
        {grid.layout.map((row, rowIndex) => (
          <div key={rowIndex} className={`grid gap-0 grid-cols-${columns}`}>
            {row.map((cell, columnIndex) => (<Cell key={columnIndex} cell={cell} />))}
          </div>
          ))
        }
      </div>
    </div>
  )
}

export default Grid;