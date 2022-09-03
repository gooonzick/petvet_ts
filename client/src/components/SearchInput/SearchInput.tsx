import { SxProps, TextField } from '@mui/material';
import {
  ChangeEvent, Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import useDebounce from '../../hooks/useDebounce';

type Props = {
  docName: string
  inputHandler: Dispatch<SetStateAction<string>>
}

const searchFieldStyle: SxProps = {
  width: { xs: '100%', sm: '100%', md: '70%' },
  alignSelf: 'end',
  mb: '0.7rem',
};

function SearchInput({ docName, inputHandler }: Props) {
  const debounced = useDebounce(docName, 1000);
  useEffect(() => {
    console.log(docName);
  }, [debounced]);

  return (
    <TextField
      sx={searchFieldStyle}
      placeholder="Введите имя врача"
      value={docName}
      onChange={(e: ChangeEvent<HTMLInputElement>) => inputHandler(e.target.value)}
    />
  );
}

export default SearchInput;
