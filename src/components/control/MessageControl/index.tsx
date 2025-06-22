import Message from "../../ui/Message";

interface IMessageControl {
  endGame: boolean;
}

function MessageControl({ endGame }: IMessageControl) {
  return (
    <>
      {endGame && 
        <Message id="message-end-game" color='green' message='You have won! END GAME!' />
      }
    </>
  );
}

export default MessageControl;
