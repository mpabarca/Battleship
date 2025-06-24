import type { SelectColumnType, SelectRowType } from "@/components/Game";
import type { GridType } from "../../../types";
import { COLUMNS_HEADER, ROWS_HEADER } from "../../../utils/game";
import Cell from "../Cell";
import { cn } from "@/utils/general";

interface IGrid {
  grid: GridType;
  showShips: boolean;
  selectingColumn: SelectColumnType;
  selectingRow: SelectRowType;
}

function Grid({ grid, showShips, selectingColumn, selectingRow }: IGrid) {
  // grid-cols-10 => GRID_SIZE[0]
  // grid-rows-10 => GRID_SIZE[1]

  return (
    <div className='flex justify-center items-start h-full sm:border border-zinc-200 py-4 md:px-7 md:py-7 overflow-x-auto text-zinc-400 text-sm md:text-lg'>
      <div id='rows-header' className='flex flex-col'>
        <div className='w-6 h-6 md:w-12 md:h-12'>{""}</div>
        <div className="flex flex-col gap-2 md:gap-3">
          {ROWS_HEADER.map((row) => (
            <div
              key={`${row}-header`}
              className={cn(
                "w-6 h-6 md:w-12 md:h-12 flex justify-center items-center",
                selectingRow.selecting &&
                  selectingRow.row === row &&
                  "text-yellow-400 font-bold dark:text-sky-400"
              )}
            >
              {row}
            </div>
          ))}
        </div>
        <div className='w-6 h-6 md:w-12 md:h-12'>{""}</div>
      </div>
      <div className='flex flex-col'>
        <div className='flex flex-row justify-between'>
          {COLUMNS_HEADER.map((col, index) => (
            <div
              key={`${col}-header`}
              className={cn(
                "w-6 h-6 md:w-12 md:h-12 flex justify-center items-center",
                selectingColumn.selecting &&
                  selectingColumn.column - 1 === index &&
                  "text-yellow-400 font-bold dark:text-sky-400"
              )}
            >
              {col}
            </div>
          ))}
        </div>
        <div className='grid grid-rows-10 gap-2 md:gap-3'>
          {grid.layout.map((row, rowIndex) => (
            <div key={rowIndex} className={`grid gap-2 md:gap-3 grid-cols-10`}>
              {row.map((cell, columnIndex) => (
                <Cell
                  key={columnIndex}
                  cell={cell}
                  showShips={showShips}
                  selectingColumn={selectingColumn}
                  selectingRow={selectingRow}
                />
              ))}
            </div>
          ))}
        </div>
        <div className='flex flex-row justify-between'>
          {COLUMNS_HEADER.map((col, index) => (
            <div
              key={`${col}-header`}
              className={cn(
                "w-6 h-6 md:w-12 md:h-12 flex justify-center items-center",
                selectingColumn.selecting &&
                  selectingColumn.column - 1 === index &&
                  "text-yellow-400 font-bold dark:text-sky-400"
              )}
            >
              {col}
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col justify-between'>
        <div className='w-6 h-6 md:w-12 md:h-12'>{""}</div>
        <div className="flex flex-col gap-2 md:gap-3">
          {ROWS_HEADER.map((row) => (
            <div
              key={`${row}-header`}
              className={cn(
                "w-6 h-6 md:w-12 md:h-12 flex justify-center items-center",
                selectingRow.selecting &&
                  selectingRow.row === row &&
                  "text-yellow-400 font-bold dark:text-sky-400"
              )}
            >
              {row}
            </div>
          ))}
        </div>
        <div className='w-6 h-6 md:w-12 md:h-12'>{""}</div>
      </div>
    </div>
  );
}

export default Grid;
