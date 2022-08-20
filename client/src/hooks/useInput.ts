import { ChangeEvent, useState } from 'react';

function useInput<T>(initialValue: T) {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(value);
  };

  const onBlur = () => {
    setIsDirty(true);
  };

  return { value, onChange, onBlur };
}

export default useInput;
