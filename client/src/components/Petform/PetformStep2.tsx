import { ChangeEvent, useState } from 'react';
import {
  TextField, Box, FormControl, InputLabel, Select, MenuItem, Typography, SxProps, Theme,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { PetForm } from '../../models/models';
import WordCard from '../WordCard/WordCard';

type Props = {
  petForm: PetForm,
  inputHandler: {
    simpelInputHandler: (e: any) => void,
    arrayInputHandler: (e: any, key: 'vaccinations' | 'chronicDiseases' | 'allergies') => void,
    removeFromArray: (property: 'vaccinations' | 'chronicDiseases' | 'allergies', removeIndex: number) => void,
  }
};

const parentBoxStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: '1rem',
  width: '80%',
  margin: 'auto',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  boxShadow: '8px 8px 10px rgba(0, 0, 0, 0.5)',
  padding: '2rem 2rem 0 2rem',
  minHeight: '60vh',
};

function PetformStep2({ petForm, inputHandler }: Props) {
  const [focus, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <Box sx={parentBoxStyle}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <FormControl sx={{ width: '48%' }}>
          <InputLabel id="petster">Стерелизация</InputLabel>
          <Select
            labelId="petsterilized"
            id="petsex-select"
            label="Стерелизация"
            name="sterilized"
            value={petForm.sterilized}
            onChange={inputHandler.simpelInputHandler}
          >
            <MenuItem value={true as any}>Да</MenuItem>
            <MenuItem value={false as any}>Нет</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="petsterilizeddate"
          label="Дата стерелизации"
          variant="standard"
          name="sterilizedDate"
          onFocus={onFocus}
          onBlur={onBlur}
          type={focus || petForm.sterilizedDate ? 'date' : 'text'}
          value={petForm.sterilizedDate ?? ''}
          onChange={inputHandler.simpelInputHandler}
          sx={{ width: '48%' }}
          disabled={!petForm.sterilized}
        />
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Аллергии</Typography>
      {petForm.allergies.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {petForm.allergies.map((allergy, index) => (
            <WordCard
              key={`${index}-${allergy}`}
              text={allergy}
              editable
              clearHandler={() => inputHandler.removeFromArray('allergies', index)}
            />
          ))}
        </Box>
      )}
      <TextField
        id="petallergies"
        label="Аллергия"
        variant="standard"
        name="allergies"
        type="text"
        onKeyDown={(e) => inputHandler.arrayInputHandler(e, 'allergies')}
      />

      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Хронические болезни</Typography>
      {petForm.chronicDiseases.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {petForm.chronicDiseases.map((disease, index) => (
            <WordCard
              key={`${index}-${disease}`}
              text={disease}
              editable
              clearHandler={() => inputHandler.removeFromArray('chronicDiseases', index)}
            />
          ))}
        </Box>
      )}
      <TextField
        id="petallergies"
        label="Болезнь"
        variant="standard"
        name="chronic_diseases"
        type="text"
        onKeyDown={(e) => inputHandler.arrayInputHandler(e, 'chronicDiseases')}
      />
    </Box>
  );
}

export default PetformStep2;
