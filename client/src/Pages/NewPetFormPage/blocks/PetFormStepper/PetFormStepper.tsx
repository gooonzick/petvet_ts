import React, { memo } from 'react';

import { Step, StepLabel, Stepper } from '@mui/material';

import { stepperStyle } from './styles';

import steps from '../../helpers/steps';

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
