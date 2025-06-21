"use client";

import { useEffect, useState } from "react";
import Grid from "../ui/Grid";
import FireControl from "../ui/FireControl";
import type { CoordinatesType, GridType } from "../../types";
import { generateGrid, getShotResult } from "../../utils/game";
import { hasCellBeenShot } from "../../utils/cell";

/*
Handling Data accross project:
- GLOBAL => grid: GridType
            ✔ |-> stored initially on localStorage (persistance)
            ✔ |-> only changes when button  inside <FireControl /> is click
- GLOBAL => [x,y] input <- from <FireControl />
            ✔ |-> stored as state on <Game /> parent component
              |-> <Grid /> reactively uses to show selected coordinates (constant visual feedback to user)
            ✔ |-> when click button inside <FireControl /> is use to handle <grid> 

Why use useState as state managment instead of react context or others?
Based on scope, we have minimal global state: just grid and target. Which are fully controlled within the Game parent component.
So are only need it at one level (or passed once to children).
*/

function Game() {
  const [target, setTarget] = useState<CoordinatesType>([0,0]);
  const [grid, setGrid] = useState<GridType>();

  function handleFire(): void {
    if (target && grid && hasCellBeenShot(target, grid?.layout))
      console.log("cell has been shot previously!");
    if (target && grid) setGrid(getShotResult(grid, target));
  }

  function resetGame() {
    localStorage.removeItem("battleship-grid");
    setTarget([0,0]);
    setGrid(generateGrid());
  }

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

  return (
    <>
      {grid ? (
        <div className='flex flex-row h-full gap-20'>
          <Grid grid={grid} />
          <div className='flex flex-col h-full gap-20 justify-between'>
            <button type='button' onClick={resetGame}>
              Reset game
            </button>
            {grid.endGame ? (
              <div>END GAME</div>
            ) : (
              <FireControl target={target} setTarget={setTarget} handleFire={handleFire} />
            )}
          </div>
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
