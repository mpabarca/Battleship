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
        ? "bg-black dark:bg-blue-950"
        : "bg-red-700"
      : "bg-orange-400 dark:bg-amber-600"
    : isBeenSelected
    ? "bg-yellow-400 dark:bg-teal-600"
    : couldBeSelected
    ? "bg-yellow-400/30 dark:bg-gray-500"
    : "bg-transparent";
  
  const sizeIcon = "w-[18px] h-[18px] md:w-[26px] md:h-[26px]"
  const whiteIcon = `text-white ${sizeIcon}`;
  const blackIcon = `text-black dark:text-white ${sizeIcon}`;

  return (
    <div
      id={`${cell.cellId}`}
      key={cell.cellId}
      className={cn(
        "w-6 h-6 md:w-12 md:h-12 flex justify-center items-center border border-zinc-600 rounded md:rounded-lg shadow-[2px_2px_0_0_black] md:shadow-[3px_3px_0_0_black] transition-colors duration-400 dark:border-white dark:shadow-[3px_3px_0_0_white] dark:md:shadow-[2px_2px_0_0_black]",
        bgColor
      )}
    >
      {cell.shipId ? (
        cell.shot ? (
          <FlameKindling className={whiteIcon} />
        ) : showShips ? (
          <Ship className={blackIcon} />
        ) : isBeenSelected ? (
          <Crosshair className={blackIcon} />
        ) : (
          ""
        )
      ) : cell.shot ? (
        <Minus className={whiteIcon} />
      ) : isBeenSelected ? (
        <Crosshair className={blackIcon} />
      ) : (
        ""
      )}
    </div>
  );
}

export default Cell;
