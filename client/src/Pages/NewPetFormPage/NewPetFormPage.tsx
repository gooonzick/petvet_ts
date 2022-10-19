import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Button, Container, Step, StepLabel, Stepper, Typography, Box, CircularProgress,
} from '@mui/material';

import { showError } from '@/redux/slices/errorSlice';
import { useAddPetMutation } from '@/redux/api/pet.api';

import ErrorModal from '@/components/ErrorModal/ErrorModal';

import { PetformSetp1, PetformStep2, PetformStep3 } from '@/components/Petform';

import usePetFormInput from '@/hooks/usePetFormInput';

import { boxStyle } from './styles';
import { pageOneValidation, pageTwoValidation } from './helpers/petFormValidation';
import initState from './helpers/initState';
import steps from './helpers/steps';

function NewPetFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addPet, { isError, isLoading }] = useAddPetMutation();
  const [activeStep, setActiveStep] = useState(0);
  const [isPetAdd, setIsPetAdd] = useState(false);
  const {
    petForm, simpelInputHandler, arrayInputHandler, removeFromArray, objectInputHandler,
  } = usePetFormInput(initState);

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      if (isPetAdd) return;
      await addPet(petForm);
      if (!isError) {
        setIsPetAdd(true);
      } else {
        dispatch(showError('Произошла ошибка'));
      }
    }
    if (activeStep === steps.length) {
      navigate('/profile');
    }
    if (activeStep === 0 && !pageOneValidation(petForm)) {
      dispatch(showError('Заполните все поля на этом этапе'));
      return;
    }
    if (activeStep === 1 && !pageTwoValidation(petForm)) {
      dispatch(showError('Заполните информацию о стерелизации'));
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Container sx={{ marginTop: '1rem' }}>
        <Stepper activeStep={activeStep} sx={{ width: '80%', margin: 'auto', marginBottom: '2rem' }}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <PetformSetp1
            petForm={petForm}
            inputHandler={simpelInputHandler}
          />
        )}
        {activeStep === 1 && (
          <PetformStep2
            petForm={petForm}
            inputHandler={{ simpelInputHandler, arrayInputHandler, removeFromArray }}
          />
        )}
        {activeStep === 2 && (
          <PetformStep3
            petForm={petForm}
            inputHandler={{
              simpelInputHandler, arrayInputHandler, removeFromArray, objectInputHandler,
            }}
          />
        )}
        {activeStep === 3 && (
          <Box sx={boxStyle}>
            <Typography
              sx={{
                width: 'max-content', m: 'auto', mt: 2, mb: 1,
              }}
              variant="h2"
            >
              Питомец добавлен!🐒
            </Typography>
          </Box>
        )}
        <Box sx={{ width: '80%', margin: 'auto' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              variant="outlined"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Назад
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button onClick={handleNext} variant="contained" disabled={isLoading}>
              {isLoading && <CircularProgress />}
              {!isLoading && activeStep === steps.length ? 'Завершить' : 'Далее'}
            </Button>
          </Box>
        </Box>
      </Container>
      <ErrorModal />
    </>
  );
}

export default NewPetFormPage;
