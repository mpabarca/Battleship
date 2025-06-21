interface IFireControl {
  inputValue: string | undefined;
  setInputValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleClick: () => void
}

function FireControl ({ inputValue, setInputValue, handleClick }: IFireControl){
  return(
    <div className="flex gap-2 items-center">
      <input value={inputValue} placeholder="eg. A5" className="w-14 h-10 border-b-2 place-content-center" onChange={(e) => setInputValue(e.target.value)}/>
      <button type="button" onClick={() => handleClick()}>Fire!</button>
    </div>
  )
}

export default FireControl;