import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Button, Container, Typography, Box, CircularProgress,
} from '@mui/material';

import ErrorModal from '@/components/ErrorModal/ErrorModal';
import { PetformSetp1, PetformStep2, PetformStep3 } from '@/components/Petform';

import PetFormStepper from './blocks/PetFormStepper';

import usePetFormInput from '@/hooks/usePetFormInput';
import { showError } from '@/redux/slices/errorSlice';
import { useAddPetMutation } from '@/redux/api/pet.api';

import { pageOneValidation, pageTwoValidation } from './helpers/petFormValidation';
import initState from './helpers/initState';
import steps from './helpers/steps';

import { boxStyle } from './styles';

function NewPetFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addPet, { isError, isLoading }] = useAddPetMutation();
  const [activeStep, setActiveStep] = useState(0);

  const {
    petForm, simpelInputHandler, arrayInputHandler, removeFromArray, objectInputHandler,
  } = usePetFormInput(initState);

  const handleNext = useCallback(async () => {
    if (activeStep === 0 && !pageOneValidation(petForm)) {
      dispatch(showError('Заполните все поля на этом этапе'));
      return;
    }

    if (activeStep === 1 && !pageTwoValidation(petForm)) {
      dispatch(showError('Заполните информацию о стерелизации'));
      return;
    }

    if (activeStep === 2) {
      await addPet(petForm);
      if (isError) {
        dispatch(showError('Произошла ошибка'));
        return;
      }
    }

    if (activeStep === 3) {
      navigate('/profile');
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, [activeStep, addPet, dispatch, isError, petForm]);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  const renderBody = useCallback(() => {
    switch (activeStep) {
      case 0:
        return (
          <PetformSetp1
            petForm={petForm}
            inputHandler={simpelInputHandler}
          />
        );
      case 1:
        return (
          <PetformStep2
            petForm={petForm}
            inputHandler={{ simpelInputHandler, arrayInputHandler, removeFromArray }}
          />
        );
      case 2:
        return (
          <PetformStep3
            petForm={petForm}
            inputHandler={{
              simpelInputHandler, arrayInputHandler, removeFromArray, objectInputHandler,
            }}
          />
        );
      case 3:
        return (
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
        );
      default:
        return <div>Что-то не так</div>;
    }
  }, [activeStep, petForm]);

  const nextStepButtonBody = useMemo(() => {
    if (activeStep === steps.length) {
      return 'Завершить';
    }

    if (isLoading) {
      return <CircularProgress />;
    }

    return 'Далее';
  }, [activeStep, isLoading]);

  const isStepBackDisable = activeStep === 0 || activeStep === 3;

  return (
    <>
      <Container sx={{ marginTop: '1rem' }}>
        <PetFormStepper step={activeStep} />
        {renderBody()}
        <Box sx={{ width: '80%', margin: 'auto' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              variant="outlined"
              disabled={isStepBackDisable}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Назад
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button onClick={handleNext} variant="contained" disabled={isLoading}>
              {nextStepButtonBody}
            </Button>
          </Box>
        </Box>
      </Container>
      <ErrorModal />
    </>
  );
}

export default NewPetFormPage;
