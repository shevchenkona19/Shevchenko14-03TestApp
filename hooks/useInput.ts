import {useState} from 'react';

type useInputReturn = {
  value: string;
  setValue: (arg0: string) => void;
  reset: () => void;
};

export const useInput: (arg0: string) => useInputReturn = initialValue => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(''),
  };
};
