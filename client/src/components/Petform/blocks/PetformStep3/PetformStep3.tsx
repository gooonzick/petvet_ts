import {
  ChangeEvent, CSSProperties, FormEvent, useState,
} from 'react';
import {
  TextField, Box, Typography, Button, SxProps, Theme,
} from '@mui/material';
import VacCard from '@/components/VacCard/VacCard';
import { Pet, Vaccinations } from '@/models/models';
import { parentBoxStyle, textFieldStyle, tytleStyle, vacFormStyle } from './styles';
import { initState } from './helpers/constants';

type Props = {
  petForm: Pet,
  inputHandler: {
    simpelInputHandler: (e: any) => void,
    arrayInputHandler: (e: any, key: 'vaccinations' | 'chronicDiseases' | 'allergies') => void,
    removeFromArray: (property: 'vaccinations' | 'chronicDiseases' | 'allergies', removeIndex: number) => void,
    objectInputHandler: (property: 'vaccinations' | 'chronicDiseases' | 'allergies', obj: Vaccinations) => void
  }
};

function PetformStep3({ petForm, inputHandler }: Props) {
  const [vac, setVac] = useState<Vaccinations>(initState);
  const [focus, setFocused] = useState(false);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const vacHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setVac((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHanlder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (vac.description === '' || vac.drugDate === null || vac.drugName === '') return;
    inputHandler.objectInputHandler('vaccinations', vac);
    setVac(initState);
  };

  return (
    <Box sx={parentBoxStyle}>
      <Typography variant="h6" sx={tytleStyle}>Прививки и обработки</Typography>
      {petForm.vaccinations.length > 0
      && (
        <Box>
          { petForm.vaccinations
            .map((vacData, index) => (
              <VacCard
                key={index}
                vacData={vacData}
                deleteCardHandler={() => inputHandler.removeFromArray('vaccinations', index)}
              />
            ))}
        </Box>
      )}
      <form style={vacFormStyle} onSubmit={(e) => submitHanlder(e)}>
        <TextField
          name="description"
          label="Что давали/кололи?"
          variant="standard"
          type="text"
          value={vac.description}
          onChange={(e:ChangeEvent<HTMLInputElement>) => vacHandler(e)}
          sx={textFieldStyle}
        />
        <TextField
          name="drugName"
          label="Название препарата"
          variant="standard"
          type="text"
          value={vac.drugName}
          onChange={(e:ChangeEvent<HTMLInputElement>) => vacHandler(e)}
          sx={textFieldStyle}
        />

        <TextField
          name="drugDate"
          label="Когда?"
          variant="standard"
          onFocus={onFocus}
          onBlur={onBlur}
          type={focus || vac.drugDate ? 'date' : 'text'}
          value={vac.drugDate ?? ''}
          onChange={(e:ChangeEvent<HTMLInputElement>) => vacHandler(e)}
          sx={textFieldStyle}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ marginTop: '0.7rem', marginLeft: 'auto' }}
        >
          Добавить
        </Button>
      </form>
    </Box>
  );
}

export default PetformStep3;
