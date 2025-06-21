import { useEffect, useState } from "react";
import type { CoordinatesType } from "../../../types";
import { transformLetterToNumber } from "../../../utils/game";

type InputType = {
  inputColumn: string;
  inputRow: string;
};

interface IFireControl {
  setInputValue: React.Dispatch<
    React.SetStateAction<CoordinatesType | undefined>
  >;
  handleClick: () => void;
}

function FireControl({ setInputValue, handleClick }: IFireControl) {
  const [value, setvalue] = useState<InputType>({
    inputColumn: "",
    inputRow: "",
  });
  
  function handleChange(e: React.FormEvent<HTMLInputElement>): void {
    const { name, value: newValue } = e.currentTarget;
    setvalue((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  }

  useEffect(() => {
    setInputValue([
      transformLetterToNumber(value.inputColumn),
      parseInt(value.inputRow),
    ]);
  }, [setInputValue, value]);

  return (
    <div className='flex gap-2 items-center'>
      <input
        name='inputColumn'
        value={value?.inputColumn}
        placeholder='A'
        className='w-10 h-10 border-b-2 text-center placeholder:text-center'
        onChange={(e) => handleChange(e)}
      />
      <input
        name='inputRow'
        value={value?.inputRow}
        placeholder='5'
        className='w-10 h-10 border-b-2 text-center placeholder:text-center'
        onChange={(e) => handleChange(e)}
      />
      <button type='button' onClick={handleClick}>
        Fire!
      </button>
    </div>
  );
}

export default FireControl;
