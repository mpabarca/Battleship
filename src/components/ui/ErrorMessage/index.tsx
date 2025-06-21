interface IErrorMessage {
  message: string;
}

function ErrorMessage({ message }: IErrorMessage) {
  return (
    <div className="flex flex-col h-18 items-center justify-center p-2 bg-red-200/80 text-red-950 border border-red-950 rounded-xl">
      {message}
    </div>
  )
}

export default ErrorMessage;