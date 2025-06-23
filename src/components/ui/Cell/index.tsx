import { Crosshair, FlameKindling, Minus, Ship } from "lucide-react";
import type { CellType } from "../../../types";
import { cn } from "@/utils/general";
import type { SelectColumnType, SelectRowType } from "@/components/Game";

interface ICell {
  cell: CellType;
  showShips: boolean;
  selectingColumn: SelectColumnType;
  selectingRow: SelectRowType;
}

function Cell({ cell, showShips, selectingColumn, selectingRow }: ICell) {
  const couldBeSelected =
    (selectingColumn.selecting &&
      selectingColumn.column === cell.coordinates[0]) ||
    (selectingRow.selecting && selectingRow.row === cell.coordinates[1]);
  const isBeenSelected =
    selectingColumn.selecting &&
    selectingColumn.column === cell.coordinates[0] &&
    selectingRow.selecting &&
    selectingRow.row === cell.coordinates[1];

  const bgColor = cell.shot
    ? cell.shipId
      ? cell.shipSunk
        ? "bg-black"
        : "bg-red-700"
      : "bg-orange-400/60"
    : isBeenSelected
    ? "bg-yellow-400"
    : couldBeSelected
    ? "bg-yellow-400/30"
    : "bg-transparent";

  return (
    <div
      id={`${cell.cellId}`}
      key={cell.cellId}
      className={cn(
        "w-12 h-12 flex justify-center items-center border border-zinc-600 rounded-lg shadow-[3px_3px_0_0_black] transition-colors duration-400",
        bgColor
      )}
    >
      {cell.shipId ? (
        cell.shot ? (
          <FlameKindling className='text-white' />
        ) : showShips ? (
          <Ship className='text-black dark:text-white' />
        ) : isBeenSelected ? (
          <Crosshair className='text-black' />
        ) : (
          ""
        )
      ) : cell.shot ? (
        <Minus className='text-white' />
      ) : isBeenSelected ? (
        <Crosshair className='text-black' />
      ) : (
        ""
      )}
    </div>
  );
}

export default Cell;
