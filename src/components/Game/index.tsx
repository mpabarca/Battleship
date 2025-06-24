"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/shadcn/AlertDialog";
import { shotToast, showShipsToast } from "@/lib/shotToast";
import { getRandomInt } from "@/utils/general";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { randomMessages } from "../../services/toastMessages";
import { type CoordinatesType, type GridType } from "../../types";
import { hasCellBeenShot } from "../../utils/cell";
import {
  generateGrid,
  getShotResult,
  transformNumberToLetter,
} from "../../utils/game";
import FireControl from "../control/FireControl";
import Grid from "../ui/Grid";
import { Button } from "../ui/shadcn/Button";

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

const initialValuesRow: SelectRowType = { selecting: false, row: 0 }
const initialValuesColumn: SelectColumnType = { selecting: false, column: 0 }


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
    const result= getShotResult(grid, target)
    setGrid(result.grid);
    // Show message to user after shot the target cell
    shotToast(result.shootType)
    setSelectingColumn((prev) => ({...prev, selecting: false}));
    setSelectingRow((prev) => ({...prev, selecting: false}));
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
        <div className='flex flex-col xl:flex-row h-full gap-14 xl:gap-24'>
          <Grid
            grid={grid}
            showShips={grid.showShips}
            selectingColumn={selectingColumn}
            selectingRow={selectingRow}
          />
          <div className='flex flex-col order-first xl:order-last h-full gap-20 justify-between'>
            <div>
              <h1>Sink It!</h1>
              <i className="text-gray-300 dark:text-gray-400">A snarky Battleship Game</i>
            </div>
            <div className='flex flex-col gap-6'>
              <Button
                type='button'
                variant={"secondary"}
                onClick={resetGame}
                className='h-12'
              >
                Reset game
              </Button>
              <Button
                type='button'
                variant={"secondary"}
                className='h-12'
                onClick={() => {
                  showShipsToast(!grid.showShips)
                  setGrid((prev) =>
                    prev ? { ...prev, showShips: !prev.showShips } : prev
                  )
                }}
              >
                {`${grid.showShips ? "Hide" : "Show"} ships`}
              </Button>
            </div>
            <div className='flex flex-col gap-10 w-60 h-full'>
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
          <AlertDialog
            open={isEndGame}
            onOpenChange={setIsEndGame}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Game Over</AlertDialogTitle>
                <AlertDialogDescription>
                  {randomMessages.end_game[getRandomInt(0,50)]}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction
                  className="px-6"
                  onClick={() => {
                    setIsEndGame(false);
                    resetGame();
                  }}
                >
                  {randomMessages.button_restart[getRandomInt(0,26)]}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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