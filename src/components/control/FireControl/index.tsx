import type { SelectColumnType, SelectRowType } from "@/components/Game";
import { Input } from "@/components/shadcn/Input";
import { Button } from "@/components/shadcn/Button";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { CoordinatesType } from "../../../types";
import {
  COLUMNS_HEADER,
  ROWS_HEADER,
  transformLetterToNumber,
} from "../../../utils/game";

interface IFireControl {
  isEndGame: boolean;
  target: CoordinatesType | [0, 0];
  setTarget: React.Dispatch<React.SetStateAction<CoordinatesType>>;
  handleFire: () => void;
  setSelectingColumn: React.Dispatch<React.SetStateAction<SelectColumnType>>;
  setSelectingRow: React.Dispatch<React.SetStateAction<SelectRowType>>;
}

type InputType = {
  inputColumn: string;
  inputRow: string;
};

const initialValues: InputType = {
  inputColumn: "",
  inputRow: "",
};

const NAVIGATION_KEYS: string[] = [
  "ArrowUp",
  "ArrowRight",
  "ArrowDown",
  "ArrowLeft",
  "Enter",
];

function FireControl({
  isEndGame,
  target,
  setTarget,
  handleFire,
  setSelectingColumn,
  setSelectingRow,
}: IFireControl) {
  const [value, setValue] = useState<InputType>(initialValues);

  const columnInputRef = useRef<HTMLInputElement>(null);
  const rowInputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (target[0] === 0 && target[1] === 0) setValue(initialValues);
  }, [target]);

  function handleClick() {
    if (value.inputColumn.length > 0 && value.inputRow.length > 0) {
      handleFire();
    } else {
      toast.error("You must fill both coordinates!");
    }
  }

  function handleChangeKeyColumn(e: React.KeyboardEvent<HTMLInputElement>) {
    const key = e.key;
    const upperValue = key.toUpperCase();

    if (
      COLUMNS_HEADER.includes(upperValue) ||
      key === "Backspace" ||
      NAVIGATION_KEYS.includes(key)
    ) {
      e.preventDefault();
      if (NAVIGATION_KEYS.includes(key)) return;
      if (key === "Backspace") {
        setValue({ ...value, inputColumn: "" });
        setTarget([0, parseInt(value.inputRow) || 0]);
        setSelectingColumn({ selecting: false, column: 0 });
        return;
      }
      if (/^[a-zA-Z]$/.test(key)) {
        const updated = { ...value, inputColumn: upperValue };
        const x = transformLetterToNumber(upperValue);
        const y = updated.inputRow ? parseInt(updated.inputRow) : 0;

        setValue(updated);
        setTarget([x, y]);
        setSelectingColumn({ selecting: true, column: x });

        if (rowInputRef.current) rowInputRef.current.focus();
      } else {
        toast.error("The input can only be from A to J!");
      }
    } else {
      e.preventDefault();
      toast.error("The input can only be a letter from A to J!");
    }
  }

  function handleChangeKeyRow(e: React.KeyboardEvent<HTMLInputElement>) {
    const key = e.key;

    if (
      /^\d$/.test(key) ||
      key === "Backspace" ||
      NAVIGATION_KEYS.includes(key)
    ) {
      e.preventDefault();
      let newRow = value.inputRow;

      if (NAVIGATION_KEYS.includes(key)) return;
      if (key === "Backspace") newRow = newRow.slice(0, -1);
      else {
        newRow += key;
      }

      // Only accept values from 1 to 10
      if (
        newRow === "" ||
        (/^\d+$/.test(newRow) && ROWS_HEADER.includes(parseInt(newRow)))
      ) {
        const updated = { ...value, inputRow: newRow };
        const x = transformLetterToNumber(updated.inputColumn);
        const y = updated.inputRow ? parseInt(updated.inputRow) : 0;

        setValue(updated);
        setTarget([x, y]);
        setSelectingRow({ selecting: true, row: y });

        if (newRow.length >= 2 || parseInt(newRow) === 10) {
          buttonRef.current?.focus();
        }
      } else {
        toast.error("The input can only be from 1 to 10!");
      }
    } else {
      e.preventDefault();
      toast.error("The input can only be digits 1 to 10!");
    }
  }

  function handleKeyNavigation(
    e: React.KeyboardEvent<HTMLInputElement | HTMLButtonElement>,
  ) {
    if (e.key === "Enter") {
      buttonRef.current?.click();
      return;
    }
    setSelectingColumn((prev) => ({ ...prev, selecting: true }));
    setSelectingRow((prev) => ({ ...prev, selecting: true }));

    const focusable = [columnInputRef, rowInputRef, buttonRef];
    const currentIndex = focusable.findIndex(
      (ref) => ref.current === document.activeElement
    );

    if (e.key === "ArrowRight" && currentIndex < focusable.length - 1) {
      focusable[currentIndex + 1]?.current?.focus();
    } else if (e.key === "ArrowLeft" && currentIndex > 0) {
      focusable[currentIndex - 1]?.current?.focus();
    }
  }

  return (
    <>
      <div className='flex gap-2 items-center justify-end xl:justify-between'>
        <div className='flex gap-2 h-12'>
          <Input
            name='inputColumn'
            value={value?.inputColumn}
            ref={columnInputRef}
            placeholder='A'
            className='w-12 h-full border-b-2 text-center placeholder:text-center'
            onChange={() => {}}
            onKeyDown={(e) => {
              if (!isEndGame) {
                handleChangeKeyColumn(e);
                handleKeyNavigation(e);
              }
            }}
          />
          <Input
            name='inputRow'
            value={value?.inputRow}
            ref={rowInputRef}
            placeholder='5'
            className='w-12 h-full border-b-2 text-center placeholder:text-center'
            onChange={() => {}}
            onKeyDown={(e) => {
              if (!isEndGame) {
                handleKeyNavigation(e);
                handleChangeKeyRow(e);
              }
            }}
          />
        </div>
        <Button
          type='button'
          ref={buttonRef}
          className={"w-34"}
          onClick={handleClick}
          onKeyDown={(e) => {
            if (!isEndGame) handleKeyNavigation(e);
          }}
        >
          Fire!
        </Button>
      </div>
    </>
  );
}

export default FireControl;
