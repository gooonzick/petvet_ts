import React, { useState } from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { Dayjs } from 'dayjs';

import { DAYS } from './helpers/constants';

type Props = {
    days: Dayjs[]
    setDays: (value: Dayjs[]) => void
}

function ToggleDays({ days, setDays }: Props) {
  return (
    <ToggleButtonGroup
      size="small"
      arial-label="Days of the week"
      value={days}
      onChange={(_, value) => setDays(value)}
    >
      {DAYS.map((day, index) => (
        <ToggleButton key={day.key} value={index} aria-label={day.key}>
          {day.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default ToggleDays;
