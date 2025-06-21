"use client"

import { useEffect, useState } from "react"
import Grid from "../ui/Grid"
import FireControl from "../ui/FireControl"
import type { CoordinatesType, GridType } from "../../types";
import { generateGrid, getShotResult } from "../../utils/game";
import { hasCellBeenShot } from "../../utils/cell";

/*
Handling Data accross project:
- GLOBAL => grid: GridType
              |-> stored initially on localStorage (persistance) -> TEMPORARY STORED AS STATE
              |-> only changes when button  inside <FireControl /> is click
- GLOBAL => [x,y] input <- from <FireControl />
            ✔ |-> stored as state on <Game /> parent component
              |-> <Grid /> reactively uses to show selected coordinates (constant visual feedback to user)
              |-> when click button inside <FireControl /> is use to handle <grid> 
*/

function Game() {
  const [target, setTarget] = useState<CoordinatesType>();
  const [grid, setGrid] = useState<GridType>()

  function handleFire (): void {
    if(target && grid && hasCellBeenShot(target, grid?.layout)) console.log("cell has been shot previously!")
    if(target && grid) setGrid(getShotResult(grid, target))
    
  }

  useEffect(() => {
    setGrid(generateGrid())
  }, [])

  return (
    <>
      {grid ? 
        <div className='flex flex-row items-center gap-20'>
          <Grid grid={grid} />
          {grid.endGame ? <div>END GAME</div> : <FireControl setTarget={setTarget} handleFire={handleFire} />}
        </div>
        : 
        <div>
          Loading new grid ...
        </div>
      }
    </>
  )
}

export default Game;
