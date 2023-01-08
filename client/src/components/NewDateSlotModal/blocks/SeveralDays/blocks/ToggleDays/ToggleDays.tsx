import React from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import * as styles from './styles';

import { DAYS } from './helpers/constants';

type Props = {
  days: number[]
  setDays: (value: number[]) => void
};

function ToggleDays({ days, setDays }: Props) {
  return (
    <ToggleButtonGroup
      size="medium"
      arial-label="Days of the week"
      value={days}
      onChange={(_, value) => setDays(value)}
      sx={styles.toggleDayButtonGroup}
    >
      {DAYS.map((day, index) => (
        <ToggleButton
          key={day.key}
          value={index}
          aria-label={day.key}
          sx={styles.toggleDayButton}
        >
          {day.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default ToggleDays;
