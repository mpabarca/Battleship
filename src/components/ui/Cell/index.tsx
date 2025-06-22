import { FlameKindling, Minus, Ship } from "lucide-react";
import type { CellType } from "../../../types";
import { cn } from "@/utils/general";

interface ICell {
  cell: CellType;
  showShips: boolean;
}

function Cell({ cell, showShips }: ICell) {
  const bgColor = cell.shot
    ? cell.shipId
      ? cell.shipSunk
        ? "bg-black"
        : "bg-red-700"
      : "bg-orange-400/60"
    : "bg-transparent";
  return (
    <div
      id={`${cell.cellId}`}
      key={cell.cellId}
      className={cn(
        "w-12 h-12 flex justify-center items-center border border-zinc-600 rounded-lg shadow-[3px_3px_0_0_black]",
        bgColor
      )}
    >
      {cell.shipId ? (
        cell.shot ? (
          <FlameKindling className='text-white' />
        ) : showShips ? (
          <Ship className='text-black dark:text-white' />
        ) : (
          ""
        )
      ) : cell.shot ? (
        <Minus className='text-white' />
      ) : (
        ""
      )}
    </div>
  );
}

export default Cell;
