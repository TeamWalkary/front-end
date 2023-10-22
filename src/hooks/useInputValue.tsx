import { useState } from "react";

interface inputValueData {
  [key: string]: string;
}

const useInputValue = (initInput: inputValueData) => {
  const [inputValue, setInputValue] = useState<inputValueData>(initInput);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  return { inputValue, handleInput } as const;
};

export default useInputValue;
