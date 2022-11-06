import React, { useState } from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { Dayjs } from 'dayjs';

import { styled } from '@mui/material';
import { DAYS } from './helpers/constants';

type Props = {
    days: number[]
    setDays: (value: Dayjs[]) => void
}

function ToggleDays({ days, setDays }: Props) {
  return (
    <ToggleButtonGroup
      size="medium"
      arial-label="Days of the week"
      value={days}
      onChange={(_, value) => setDays(value)}
      sx={{
        width: '100%',
        justifyContent: 'center',
      }}
    >
      {DAYS.map((day, index) => (
        <ToggleButton
          key={day.key}
          value={index}
          aria-label={day.key}
          sx={{
            '&.MuiToggleButtonGroup-grouped': {
              borderRadius: '50% !important',
              mx: 1,
              height: '3rem',
              width: '3rem',
              border: '1px solid #FFD35A !important',
            },
            '&.Mui-selected': {
              backgroundColor: '#FFD35A',
            },
          }}
        >
          {day.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default ToggleDays;
