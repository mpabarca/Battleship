import type { GridType } from "../../../types";
import Message from "../../ui/Message";

interface IMessageControl {
  grid: GridType;
}

function MessageControl({ grid }: IMessageControl){
  const { endGame, errors } = grid;
  return(
    <>
      {endGame ? <Message color="green" message="END GAME!" /> :
        <div className='w-full h-60 grid grid-col-3 justify-between gap-1'>
          {errors?.emptyField && (
            <Message color="red" message='You must fill both coordinates!' />
          )}
          {errors?.columnCriteria && (
            <Message color="red" message='The input can only be from A to J!' />
          )}
          {errors?.rowCriteria && (
            <Message color="red" message='The input can only be from 1 to 10!' />
          )}
        </div>
      }
    </>
  )
}

export default MessageControl;