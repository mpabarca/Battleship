"use client";

import { useEffect, useState } from "react";
import type { CoordinatesType, GridType } from "../../types";
import { hasCellBeenShot } from "../../utils/cell";
import {
  generateGrid,
  getShotResult,
  transformNumberToLetter,
} from "../../utils/game";
import FireControl from "../control/FireControl";
import Grid from "../ui/Grid";
import { Button } from "../ui/Button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/AlertDialog";

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

function Game() {
  const [target, setTarget] = useState<CoordinatesType>([0, 0]);
  const [grid, setGrid] = useState<GridType | null>(null);
  const [showEndGameDialog, setShowEndGameDialog] = useState<boolean>(false);
  const [selectingColumn, setSelectingColumn] =
    useState<SelectColumnType>({ selecting: false, column: 0 });
  const [selectingRow, setSelectingRow] =
    useState<SelectRowType>({ selecting: false, row: 0 });

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
      setShowEndGameDialog(true);
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
    setGrid(getShotResult(grid, target));
    setSelectingColumn((prev) => ({...prev, selecting: false}));
    setSelectingRow((prev) => ({...prev, selecting: false}));
  }

  function resetGame() {
    localStorage.removeItem("battleship-grid");
    setTarget([0, 0]);
    setGrid(generateGrid());
  }

  return (
    <>
      {grid ? (
        <div className='flex flex-row h-full gap-24'>
          <Grid
            grid={grid}
            showShips={grid.showShips}
            selectingColumn={selectingColumn}
            selectingRow={selectingRow}
          />
          <div className='flex flex-col h-full gap-20 justify-between'>
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
                onClick={() =>
                  setGrid((prev) =>
                    prev ? { ...prev, showShips: !prev.showShips } : prev
                  )
                }
              >
                {`${grid.showShips ? "Hide" : "Show"} ships`}
              </Button>
            </div>
            <div className='flex flex-col gap-10 w-60 h-full'>
              <FireControl
                target={target}
                setTarget={setTarget}
                handleFire={handleFire}
                setSelectingColumn={setSelectingColumn}
                setSelectingRow={setSelectingRow}
              />
            </div>
          </div>
          <AlertDialog
            open={showEndGameDialog}
            onOpenChange={setShowEndGameDialog}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Game Over</AlertDialogTitle>
                <AlertDialogDescription>
                  All ships have been sunk. Would you like to play again?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setShowEndGameDialog(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="w-32"
                  onClick={() => {
                    setShowEndGameDialog(false);
                    resetGame();
                  }}
                >
                  Restart
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