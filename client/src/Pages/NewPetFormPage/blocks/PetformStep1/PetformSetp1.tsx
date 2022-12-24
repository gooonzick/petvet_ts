import { ChangeEvent, useCallback, useState } from 'react';
import {
  TextField, Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent,
} from '@mui/material';
import { PetForm } from '@/models/models';
import { parentBoxStyle, sexAndWeightInputStyle, sexAndWeightWrapperStyle } from './styles';
import { Field, Payload } from '@/pages/NewPetFormPage/types';

type Props = {
  petForm: PetForm,
  inputHandler: (name: Field, payload: Payload, operation?: 'insert' | 'delete') => void
};

function PetformSetp1({ petForm, inputHandler }: Props) {
  const [focus, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const onInputChange = useCallback((e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    inputHandler(e.target.name, e.target.value);
  }, []);

  const onSelectChange = useCallback((e: SelectChangeEvent<number>) => {
    inputHandler(e.target.name, e.target.value);
  }, []);

  return (
    <Box sx={parentBoxStyle}>
      <TextField
        id="petname"
        label="Имя"
        variant="standard"
        name="name"
        type="text"
        value={petForm.name}
        onChange={onInputChange}
      />
      <TextField
        id="petspice"
        label="Вид"
        variant="standard"
        name="specie"
        type="text"
        value={petForm.specie}
        onChange={onInputChange}
      />
      <TextField
        id="petbreed"
        label="Порода"
        variant="standard"
        name="breed"
        type="text"
        value={petForm.breed}
        onChange={onInputChange}
      />
      <Box sx={sexAndWeightWrapperStyle}>
        <FormControl variant="standard" sx={sexAndWeightInputStyle}>
          <InputLabel id="petsex">Пол</InputLabel>
          <Select
            labelId="petsex"
            id="petsex-select"
            label="Пол"
            name="sex"
            value={petForm.sex}
            onChange={onSelectChange}
          >
            <MenuItem value={0}>Ж</MenuItem>
            <MenuItem value={1}>М</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="petweight"
          label="Вес"
          variant="standard"
          name="weight"
          type="number"
          value={petForm.weight}
          onChange={onInputChange}
          sx={sexAndWeightInputStyle}
        />
      </Box>
      <TextField
        onFocus={onFocus}
        onBlur={onBlur}
        type={focus || petForm.birthday ? 'date' : 'text'}
        id="petbday"
        label="Дата рождения"
        variant="standard"
        name="birthday"
        value={petForm.birthday ?? ''}
        onChange={onInputChange}
      />
      <TextField
        id="petcolor"
        label="Окрас"
        variant="standard"
        name="color"
        type="text"
        value={petForm.color}
        onChange={onInputChange}
      />
    </Box>
  );
}

export default PetformSetp1;
