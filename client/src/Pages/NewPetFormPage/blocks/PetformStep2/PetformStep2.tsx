import {
  ChangeEvent, KeyboardEvent, useCallback, useState,
} from 'react';

import {
  Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent,
  TextField, Typography,
} from '@mui/material';

import WordCard from '@/components/WordCard/WordCard';

import { PetForm } from '@/models/models';

import { parentBoxStyle } from './styles';

import { InputFunc } from '@/pages/NewPetFormPage/types';

type Props = {
  petForm: PetForm;
  inputHandler: InputFunc;
};

function PetformStep2({ petForm, inputHandler }: Props) {
  const [focus, setFocused] = useState(false);
  const [currentAllergy, setCurrentAllergy] = useState('');
  const [currentDiseases, setCurrentDiseases] = useState('');

  const onFocus = useCallback(() => setFocused(true), []);
  const onBlur = useCallback(() => setFocused(false), []);

  const onInputChange = useCallback((e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    inputHandler(e.target.name, e.target.value);
  }, []);

  const onSelectChange = useCallback((e: SelectChangeEvent<boolean>) => {
    inputHandler(e.target.name, Boolean(e.target.value));
  }, []);

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>, name: string, value: string) => {
    if (e.key === 'Enter') {
      inputHandler(name, value);
      setCurrentAllergy('');
      setCurrentDiseases('');
    }
  }, []);

  return (
    <Box sx={parentBoxStyle}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <FormControl variant="standard" sx={{ width: '48%' }}>
          <InputLabel id="petster">Стерелизация</InputLabel>
          <Select
            labelId="petsterilized"
            id="petsex-select"
            label="Стерелизация"
            name="sterilized"
            variant="standard"
            value={petForm.sterilized}
            onChange={onSelectChange}
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
          onChange={onInputChange}
          sx={{ width: '48%' }}
          disabled={!petForm.sterilized}
        />
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Аллергии</Typography>
      {petForm.allergies.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {petForm.allergies.map((allergy, index) => (
            <WordCard
              key={allergy}
              text={allergy}
              editable
              clearHandler={() => inputHandler('allergies', index, 'delete')}
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
        helperText="Введите значение и нажмите Enter/Ввод"
        value={currentAllergy}
        onChange={(e) => setCurrentAllergy(e.target.value)}
        onKeyDown={(e) => onKeyDown(e, 'allergies', currentAllergy)}
      />

      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Хронические болезни</Typography>
      {petForm.chronicDiseases.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {petForm.chronicDiseases.map((disease, index) => (
            <WordCard
              key={disease}
              text={disease}
              editable
              clearHandler={() => inputHandler('chronicDiseases', index, 'delete')}
            />
          ))}
        </Box>
      )}
      <TextField
        id="petchronicdiseases"
        label="Болезнь"
        variant="standard"
        name="chronicDiseases"
        type="text"
        helperText="Введите значение и нажмите Enter/Ввод"
        value={currentDiseases}
        onChange={(e) => setCurrentDiseases(e.target.value)}
        onKeyDown={(e) => onKeyDown(e, 'chronicDiseases', currentDiseases)}
      />
    </Box>
  );
}

export default PetformStep2;
