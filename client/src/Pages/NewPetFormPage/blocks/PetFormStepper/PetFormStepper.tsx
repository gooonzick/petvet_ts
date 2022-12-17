import React, { memo } from 'react';
import { Step, StepLabel, Stepper } from '@mui/material';
import steps from '../../helpers/steps';
import { stepperStyle } from './styles';

type Props = {
  step: number;
};

function PetFormStepper({ step }: Props) {
  return (
    <Stepper activeStep={step} sx={stepperStyle}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

export default memo(PetFormStepper);
