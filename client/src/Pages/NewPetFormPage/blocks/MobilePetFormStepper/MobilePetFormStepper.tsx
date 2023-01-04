import React, { memo } from 'react';

import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import {
  Button,
  MobileStepper,
} from '@mui/material';

type Props = {
  steps: any[];
  activeStep: number;
  handleNext: VoidFunction;
  handleBack: VoidFunction;
  nextText: () => JSX.Element | 'Завершить' | 'Далее';
};

function MobilePetFormStepper({
  steps, activeStep, handleNext, handleBack, nextText,
}: Props) {
  return (
    <MobileStepper
      variant="text"
      steps={steps.length}
      position="static"
      activeStep={activeStep}
      nextButton={(
        <Button
          size="small"
          onClick={handleNext}
          disabled={activeStep === steps.length}
        >
          {nextText()}
          <KeyboardArrowRight />
        </Button>
)}
      backButton={(
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          <KeyboardArrowLeft />
          Назад
        </Button>
)}
    />
  );
}

export default memo(MobilePetFormStepper);
