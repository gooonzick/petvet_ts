import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button, Container, Step, StepLabel, Stepper, Typography, Box, CircularProgress,
} from '@mui/material';
import { useAddPetMutation } from '../../redux/api/pet.api';
import { pageOneValidation, pageTwoValidation } from '../../utils/petFormValidation';
import { showError, hideError } from '../../redux/slices/errorSlice';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import PetformSetp1 from '../../components/Petform/PetformSetp1';
import PetformSetp2 from '../../components/Petform/PetformStep2';
import usePetFormInput from '../../hooks/usePetFormInput';
import PetformStep3 from '../../components/Petform/PetformStep3';

const steps = ['Основная информация', 'Хронические болезни и аллергии', 'Прививки и обработки'];
const boxStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '1rem',
  width: '80%',
  margin: 'auto',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  boxShadow: '8px 8px 10px rgba(0, 0, 0, 0.5)',
  padding: '2rem 2rem 0 2rem',
  minHeight: '60vh',
};

function NewPetFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addPet, { isError, isLoading, error }] = useAddPetMutation();
  const [activeStep, setActiveStep] = useState(0);
  const [isPetAdd, setIsPetAdd] = useState(false);
  const {
    petForm, simpelInputHandler, arrayInputHandler, removeFromArray, objectInputHandler,
  } = usePetFormInput({
    name: '',
    specie: '',
    breed: '',
    sex: 0,
    birthday: null,
    weight: '',
    color: '',
    sterilized: false,
    allergies: [],
    chronicDiseases: [],
    vaccinations: [],
  });

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      await addPet(petForm);
      if (!isError) setIsPetAdd(true);
      dispatch(showError('Произошла ошибка'));
    }
    if (activeStep === steps.length) {
      navigate('/profile');
    }
    if (activeStep === 0 && !pageOneValidation(petForm)) {
      dispatch(showError('Заполните все поля на этом этапе'));
      return null;
    }
    if (activeStep === 1 && !pageTwoValidation(petForm)) {
      dispatch(showError('Заполните информацию о стерелизации'));
      return null;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    return null;
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
          <PetformSetp2
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
