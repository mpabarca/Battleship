import type { CellType } from "../../../types";

interface ICell {
  cell: CellType;
}

function Cell ({ cell }: ICell) {
  return(
    <div key={cell.cellId} className="w-14 h-14 flex justify-center items-center border border-zinc-600">
      {cell.shipId ? cell.shot ? "X" : "0" : cell.shot ? "-" : ""}
    </div>
  )
}

export default Cell;