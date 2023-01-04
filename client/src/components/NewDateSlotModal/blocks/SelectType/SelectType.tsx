import { memo, useState } from 'react';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import NewSlotType from '../../types';

type Props = {
  type: NewSlotType
  setType: (type: NewSlotType) => void
};

function SelectType({ type, setType }: Props) {
  const handleChange = (event: SelectChangeEvent<NewSlotType>) => {
    switch (event.target.value) {
      case NewSlotType.severalDays:
        setType(NewSlotType.severalDays);
        break;
      case NewSlotType.singleDay:
        setType(NewSlotType.singleDay);
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ marginTop: '0.5rem' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Тип записи</InputLabel>
        <Select
          value={type}
          label="Тип записи"
          onChange={handleChange}
        >
          <MenuItem value={NewSlotType.severalDays}>Несколько приемов</MenuItem>
          <MenuItem value={NewSlotType.singleDay}>Один прием</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default memo(SelectType);
