/* eslint-disable react/jsx-props-no-spreading */
import { Box, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import {
  Dispatch, SetStateAction, useCallback, useEffect,
} from 'react';
import ToggleDays from './blocks/ToggleDays';
import getSlots from './helpers/getSlots';

type Props = {
    startDate: Dayjs
    endDate: Dayjs
    selectedDays: number[]
    handleChange: (type: 'start' | 'end' | 'selected' | 'selectDays', payload: Dayjs | Dayjs[]) => void
}

function SeveralDays({
  startDate, endDate, selectedDays, handleChange,
}: Props) {
  const handleStart = useCallback((value: Dayjs | null) => {
    if (value) {
      handleChange('start', value);
    }
  }, [handleChange]);

  const handleEnd = useCallback((value: Dayjs | null) => {
    if (value) {
      handleChange('end', value);
    }
  }, [handleChange]);

  const handleSelect = useCallback((value: Dayjs[]) => {
    handleChange('selected', value);
  }, [handleChange]);

  useEffect(() => {
    const newTimeSlots = getSlots(startDate, endDate, selectedDays);
    handleChange('selectDays', newTimeSlots);
  }, [selectedDays]);

  return (
    <Box sx={{
      marginTop: '1rem',
    }}
    >
      <Box sx={{
        display: 'flex',
        // justifyContent: 'space-between',
        gap: '0.4rem',
        width: '100%',
      }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Дата начала"
            inputFormat="DD/MM/YYYY"
            value={startDate}
            onChange={handleStart}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Дата конца"
            inputFormat="DD/MM/YYYY"
            value={endDate}
            onChange={handleEnd}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={{ marginTop: '1rem' }}>
        <ToggleDays days={selectedDays} setDays={handleSelect} />
      </Box>
    </Box>
  );
}

export default SeveralDays;
