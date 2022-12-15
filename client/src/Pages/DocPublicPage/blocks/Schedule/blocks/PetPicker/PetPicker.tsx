import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  FormControl,
  InputLabel,
  MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import { RootState } from '@/redux/types';

type Props = {
  currentPet: number | null;
  setPet: (id: number | null) => void;
};

function PetPicker({ currentPet, setPet }: Props) {
  const pets = useSelector((state: RootState) => state.auth.user?.pets);

  const handleChange = useCallback((event: SelectChangeEvent<number | null>) => {
    setPet(Number(event.target.value));
  }, [setPet]);

  if (!pets) {
    return <p>У вас нет питомца</p>;
  }

  return (
    <FormControl
      fullWidth
      sx={{ marginTop: '1rem' }}
    >
      <InputLabel id="petpicker-select-label">Питомец</InputLabel>
      <Select
        labelId="petpicker-select-label"
        id="petpicker-select"
        value={currentPet}
        label="Питомец"
        onChange={handleChange}
      >
        {pets.map(({ id, name }) => <MenuItem key={`${id}-${name}`} value={id}>{name}</MenuItem>)}
      </Select>
    </FormControl>
  );
}

export default PetPicker;
