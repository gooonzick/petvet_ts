import React, {
  ChangeEvent, CSSProperties, FormEvent, useState,
} from 'react';
import {
  TextField, Box, Typography, Button, SxProps, Theme,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import VacCard from '../VacCard/VacCard';
import { Pet, Vaccinations } from '../../models/models';

type Props = {
  petForm: Pet,
  inputHandler: {
    simpelInputHandler: (e: any) => void,
    arrayInputHandler: (e: any, key: 'vaccinations' | 'chronicDiseases' | 'allergies') => void,
    removeFromArray: (property: 'vaccinations' | 'chronicDiseases' | 'allergies', removeIndex: number) => void,
    objectInputHandler: (property: 'vaccinations' | 'chronicDiseases' | 'allergies', obj: Vaccinations) => void
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

const tytleStyle: SxProps<Theme> = { fontWeight: 'bold' };

const textFieldStyle: SxProps<Theme> = { width: '100%' };

const vacFormStyle: CSSProperties = { width: '80%', margin: '2rem auto' };

function PetformStep3({ petForm, inputHandler }: Props) {
  const [vac, setVac] = useState<Vaccinations>({
    description: '',
    drugName: '',
    drugDate: null,
  });

  const [focus, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const vacHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setVac((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHanlder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (vac.description === '' || vac.drugDate !== null || vac.drugName === '') return;
    inputHandler.objectInputHandler('vaccinations', vac);
    setVac({
      description: '',
      drugName: '',
      drugDate: null,
    });
  };

  return (
    <Box sx={parentBoxStyle}>
      <Typography variant="h6" sx={tytleStyle}>Прививки и обработки</Typography>
      {petForm.vaccinations.length > 0
      && petForm.vaccinations
        .map((vacData, index) => (
          <VacCard
            key={index}
            vacData={vacData}
            deleteCardHandler={() => inputHandler.removeFromArray('vaccinations', index)}
          />
        ))}
      <form style={vacFormStyle} onSubmit={(e) => submitHanlder(e)}>
        <div>
          <TextField
            name="description"
            label="Что давали/кололи?"
            variant="standard"
            type="text"
            value={vac.description}
            onChange={(e:ChangeEvent<HTMLInputElement>) => vacHandler(e)}
            sx={textFieldStyle}
          />

        </div>
        <div>
          <TextField
            name="drug_name"
            label="Название препарата"
            variant="standard"
            type="text"
            value={vac.drugName}
            onChange={(e:ChangeEvent<HTMLInputElement>) => vacHandler(e)}
            sx={textFieldStyle}
          />
        </div>
        <div>
          <TextField
            name="drug_date"
            label="Когда?"
            variant="standard"
            onFocus={onFocus}
            onBlur={onBlur}
            type={focus ? 'date' : 'text'}
            value={vac.drugDate}
            onChange={(e:ChangeEvent<HTMLInputElement>) => vacHandler(e)}
            sx={textFieldStyle}
          />
        </div>
        <Button type="submit" variant="contained" sx={{ marginTop: '0.7rem', marginLeft: 'auto' }}>Добавить</Button>
      </form>
    </Box>
  );
}

export default PetformStep3;
