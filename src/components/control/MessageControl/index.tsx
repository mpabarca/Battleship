import type { CoordinatesType, GridType } from "../../../types";
import { transformNumberToLetter } from "../../../utils/game";
import Message from "../../ui/Message";

interface IMessageControl {
  grid: GridType;
  target: CoordinatesType | [0, 0];
}

function MessageControl({ grid, target }: IMessageControl) {
  const { endGame, errors } = grid;
  return (
    <>
      {endGame ? (
        <Message id="message-end-game" color='green' message='You have won! END GAME!' />
      ) : (
        <div className='w-full grid grid-col-3 justify-start gap-1'>
          {errors?.hasCellBeenShot && target[0] !== 0 && target[1] !== 0 && (
            <Message
              id="message-hasCellBeenShot"
              color='yellow'
              message={`Cell [${transformNumberToLetter(target[0])},${
                target[1]
              }] has been shot previously! Try a new one`}
            />
          )}
          {errors?.emptyField && (
            <Message id="message-emptyField" color='red' message='You must fill both coordinates!' />
          )}
          {errors?.columnCriteria && (
            <Message id="message-columnCriteria" color='red' message='The input can only be from A to J!' />
          )}
          {errors?.rowCriteria && (
            <Message
              id="message-rowCriteria"
              color='red'
              message='The input can only be from 1 to 10!'
            />
          )}
        </div>
      )}
    </>
  );
}

export default MessageControl;
