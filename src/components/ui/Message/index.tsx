interface IMessage {
  message: string;
  color: 'red' | 'yellow' | 'green';
}

type ColorThemeType = {
  red: string;
  yellow: string;
  green: string;
}

function Message({ message, color }: IMessage) {
  const theme: ColorThemeType = {
    red: 'bg-red-200/80 text-red-950 border-red-950',
    yellow: '',
    green: '',
  }
 
  return (
    <div className={`flex flex-col h-18 items-center justify-center p-2 border rounded-sm ${theme[color]}`}>
      {message}
    </div>
  )
}

export default Message;