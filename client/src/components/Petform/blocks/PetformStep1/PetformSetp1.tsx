import { useState } from 'react';
import {
  TextField, Box, FormControl, InputLabel, Select, MenuItem, SxProps, Theme,
} from '@mui/material';
import { Pet } from '@/models/models';
import { parentBoxStyle, sexAndWeightInputStyle } from './styles';

type Props = {
  petForm: Pet,
  inputHandler: (e: any) => void
};

function PetformSetp1({ petForm, inputHandler }: Props) {
  const [focus, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <Box sx={parentBoxStyle}>
      <TextField id="petname" label="Имя" variant="standard" name="name" type="text" value={petForm.name} onChange={inputHandler} />
      <TextField id="petspice" label="Вид" variant="standard" name="specie" type="text" value={petForm.specie} onChange={inputHandler} />
      <TextField id="petbreed" label="Порода" variant="standard" name="breed" type="text" value={petForm.breed} onChange={inputHandler} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <FormControl sx={sexAndWeightInputStyle}>
          <InputLabel id="petsex">Пол</InputLabel>
          <Select
            labelId="petsex"
            id="petsex-select"
            label="Пол"
            name="sex"
            value={petForm.sex}
            onChange={inputHandler}
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
          onChange={inputHandler}
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
        onChange={inputHandler}
      />
      <TextField
        id="petcolor"
        label="Окрас"
        variant="standard"
        name="color"
        type="text"
        value={petForm.color}
        onChange={inputHandler}
      />
    </Box>
  );
}

export default PetformSetp1;
