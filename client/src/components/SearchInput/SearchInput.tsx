import {
  ChangeEvent, Dispatch, SetStateAction,
} from 'react';

import { SxProps, TextField } from '@mui/material';

type Props = {
  docName: string
  inputHandler: Dispatch<SetStateAction<string>>
};

const searchFieldStyle: SxProps = {
  width: { xs: '100%', sm: '100%', md: '70%' },
  alignSelf: 'end',
  mb: '0.7rem',
};

function SearchInput({ docName, inputHandler }: Props) {
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
