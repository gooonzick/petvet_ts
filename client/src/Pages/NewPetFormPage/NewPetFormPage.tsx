import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Typography,
  Box,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Paper,
} from '@mui/material';

import ErrorModal from '@/components/ErrorModal/ErrorModal';

import PetformSetp1 from './blocks/PetformStep1';
import PetformStep2 from './blocks/PetformStep2/PetformStep2';
import PetformStep3 from './blocks/PetformStep3/PetformStep3';
import MobilePetFormStepper from './blocks/MobilePetFormStepper';
import PetFormStepper from './blocks/PetFormStepper';

import usePetFormInput from '@/pages/NewPetFormPage/hooks/usePetFormInput';
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

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    petForm, inputHandler,
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
  }, [activeStep, addPet, dispatch, isError, navigate, petForm]);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  const renderHeader = useCallback(() => {
    if (matches) {
      return (
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            pl: 2,
            backgroundColor: (t) => t.palette.primary.main,
          }}
        >
          <Typography>{steps[activeStep]}</Typography>
        </Paper>
      );
    }
    return <PetFormStepper step={activeStep} />;
  }, [activeStep, matches]);

  const renderBody = useCallback(() => {
    switch (activeStep) {
      case 0:
        return (
          <PetformSetp1
            petForm={petForm}
            inputHandler={inputHandler}
          />
        );
      case 1:
        return (
          <PetformStep2
            petForm={petForm}
            inputHandler={inputHandler}
          />
        );
      case 2:
        return (
          <PetformStep3
            petForm={petForm}
            inputHandler={inputHandler}
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

  const renderFooter = useCallback(() => {
    const nextStepButtonBody = () => {
      if (activeStep === steps.length) {
        return 'Завершить';
      }

      if (isLoading) {
        return <CircularProgress />;
      }

      return 'Далее';
    };

    if (matches) {
      return (
        <MobilePetFormStepper
          activeStep={activeStep}
          handleBack={handleBack}
          handleNext={handleNext}
          nextText={nextStepButtonBody}
          steps={steps}
        />
      );
    }
    const isStepBackDisable = activeStep === 0 || activeStep === 3;
    return (
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
            {nextStepButtonBody()}
          </Button>
        </Box>
      </Box>
    );
  }, [activeStep, handleBack, handleNext, isLoading, matches]);

  return (
    <>
      <Box sx={{ marginTop: { xs: 0, sm: '1rem', md: '1rem' } }}>
        {renderHeader()}
        <Box sx={{ margin: { xs: '1rem 0', sm: '1rem 0', md: 0 } }}>
          {renderBody()}
        </Box>
        {renderFooter()}
      </Box>
      <ErrorModal />
    </>
  );
}

export default NewPetFormPage;
