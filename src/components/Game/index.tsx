"use client";

import { shotToast, showShipsToast } from "@/lib/shotToast";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { type CoordinatesType, type GridType } from "../../types";
import { hasCellBeenShot } from "../../utils/cell";
import {
  generateGrid,
  getShotResult,
  transformNumberToLetter,
} from "../../utils/game";
import FireControl from "../control/FireControl";
import Grid from "../ui/Grid";
import { Button } from "@/components/shadcn/Button";
import EndGameAlertDialog from "../ui/EndGameAlertDialog";

/*
Handling Data accross project:
- GLOBAL => grid: GridType
            ✔ |-> stored initially on localStorage (persistance)
            ✔ |-> only changes when button  inside <FireControl /> is click
- GLOBAL => [x,y] input <- from <FireControl />
            ✔ |-> stored as state on <Game /> parent component
            ✔ |-> <Grid /> reactively uses to show selected coordinates (constant visual feedback to user)
            ✔ |-> when click button inside <FireControl /> is use to handle <grid> 

Why use useState as state managment instead of react context or others?
Based on scope, we have minimal global state: just grid and target. Which are fully controlled within the Game parent component.
So are only need it at one level (or passed once to children).
*/

export type SelectColumnType = { selecting: boolean; column: number };
export type SelectRowType = { selecting: boolean; row: number };

const initialValuesRow: SelectRowType = { selecting: false, row: 0 };
const initialValuesColumn: SelectColumnType = { selecting: false, column: 0 };

function Game() {
  const [target, setTarget] = useState<CoordinatesType>([0, 0]);
  const [grid, setGrid] = useState<GridType | null>(null);
  const [isEndGame, setIsEndGame] = useState<boolean>(false);
  const [selectingColumn, setSelectingColumn] =
    useState<SelectColumnType>(initialValuesColumn);
  const [selectingRow, setSelectingRow] =
    useState<SelectRowType>(initialValuesRow);

  useEffect(() => {
    const storedGrid = localStorage.getItem("battleship-grid");
    if (storedGrid) {
      setGrid(JSON.parse(storedGrid));
    } else {
      setGrid(generateGrid());
    }
  }, []);

  useEffect(() => {
    if (grid) {
      localStorage.setItem("battleship-grid", JSON.stringify(grid));
    }
  }, [grid]);

  useEffect(() => {
    if (grid?.endGame) {
      setIsEndGame(true);
    }
  }, [grid?.endGame]);

  function handleFire(): void {
    if (!grid || !target) return;
    if (hasCellBeenShot(target, grid.layout)) {
      toast.error(
        `Cell [${transformNumberToLetter(target[0])},${
          target[1]
        }] has been shot previously! Try a new one`
      );
      return;
    }
    const result = getShotResult(grid, target);
    setGrid(result.grid);
    // Show message to user after shot the target cell
    shotToast(result.shootType);
    setSelectingColumn((prev) => ({ ...prev, selecting: false }));
    setSelectingRow((prev) => ({ ...prev, selecting: false }));
  }

  function resetGame() {
    localStorage.removeItem("battleship-grid");
    setTarget([0, 0]);
    setGrid(generateGrid());
    setSelectingColumn(initialValuesColumn);
    setSelectingRow(initialValuesRow);
  }

  return (
    <>
      {grid ? (
        <div className='flex flex-col xl:flex-row justify-between gap-10 md:gap-12 xl:gap-0 w-full'>
          <Grid
            grid={grid}
            showShips={grid.showShips}
            selectingColumn={selectingColumn}
            selectingRow={selectingRow}
          />
          <div className='w-full xl:w-70 flex flex-col md:flex-row xl:flex-col items-center justify-between order-first xl:order-last gap-10 md:gap-12'>
            <div id="battleship-title" className=" flex flex-col items-start w-full md:w-1/3 xl:w-full">
              <h1>Sink It!</h1>
              <i className='text-gray-300 dark:text-gray-400'>
                A snarky Battleship Game
              </i>
            </div>
            <div id="setting-buttons" className='flex flex-col lg:flex-row xl:flex-col gap-2 xl:gap-6  w-full md:w-1/3 xl:w-full justify-between'>
              <Button
                type='button'
                variant={"secondary"}
                onClick={resetGame}
                className='h-12 lg:w-30 xl:w-full'
              >
                Reset game
              </Button>
              <Button
                type='button'
                variant={"secondary"}
                className='h-12 lg:w-30 xl:w-full'
                onClick={() => {
                  showShipsToast(!grid.showShips);
                  setGrid((prev) =>
                    prev ? { ...prev, showShips: !prev.showShips } : prev
                  );
                }}
              >
                {`${grid.showShips ? "Hide" : "Show"} ships`}
              </Button>
            </div>
            <div id="fire-control"  className='flex flex-col gap-10  w-full md:w-1/3 xl:w-full h-full'>
              <FireControl
                isEndGame={isEndGame}
                target={target}
                setTarget={setTarget}
                handleFire={handleFire}
                setSelectingColumn={setSelectingColumn}
                setSelectingRow={setSelectingRow}
              />
            </div>
          </div>
          <EndGameAlertDialog
            isEndGame={isEndGame}
            setIsEndGame={setIsEndGame}
            resetGame={resetGame}
          />
        </div>
      ) : (
        <div className='flex flex-row items-center gap-20'>
          <button type='button' onClick={() => setGrid(generateGrid())}>
            Start game
          </button>
        </div>
      )}
    </>
  );
}

export default Game;
