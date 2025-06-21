"use client"

import { useEffect, useState } from "react"
import Grid from "../ui/Grid"
import FireControl from "../ui/FireControl"
import type { CoordinatesType, GridType } from "../../types";
import { generateGrid } from "../../utils/game";

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
  const [inputValue, setInputValue] = useState<CoordinatesType>();
  const [grid, setGrid] = useState<GridType>()

  function handleClick (): void {
    console.log("in handleClick", inputValue)
  }

  useEffect(() => {
    setGrid(generateGrid())
  }, [])

  useEffect(() => {
    console.log('inputValue', inputValue)
  }, [inputValue])

  return (
    <>
      {grid ? 
        <div className='flex flex-row items-center gap-24'>
          <Grid grid={grid} />
          <FireControl setInputValue={setInputValue} handleClick={handleClick} />
        </div>
        : 
        <div>
          Loading new grid ...
        </div>
      }
    </>
  )
}

export default Game
