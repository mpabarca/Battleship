interface IMessage {
  id: string;
  message: string;
  color: 'red' | 'yellow' | 'green';
}

type ColorThemeType = {
  red: string;
  yellow: string;
  green: string;
}

function Message({ message, color, id }: IMessage) {
  const theme: ColorThemeType = {
    red: 'bg-red-200/80 text-red-950 border-red-950',
    yellow: 'bg-yellow-100 text-yellow-950 border-yellow-950',
    green: 'bg-green-100 text-green-950 border-green-950',
  }
 
  return (
    <div id={id} className={`flex flex-col h-18 items-center justify-center p-2 border rounded-sm ${theme[color]}`}>
      {message}
    </div>
  )
}

export default Message;