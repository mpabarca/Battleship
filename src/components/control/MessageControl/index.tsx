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
        <Message color='green' message='END GAME!' />
      ) : (
        <div className='w-full grid grid-col-3 justify-start gap-1'>
          {errors?.hasCellBeenShot && (
            <Message
              color='yellow'
              message={`Cell [${transformNumberToLetter(target[0])},${
                target[1]
              }] has been shot previously! Try a new one`}
            />
          )}
          {errors?.emptyField && (
            <Message color='red' message='You must fill both coordinates!' />
          )}
          {errors?.columnCriteria && (
            <Message color='red' message='The input can only be from A to J!' />
          )}
          {errors?.rowCriteria && (
            <Message
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
