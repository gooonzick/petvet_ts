/* eslint-disable react/jsx-props-no-spreading */
import { Box, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { useCallback } from 'react';
import ToggleDays from './blocks/ToggleDays';

type Props = {
    startDate: Dayjs
    endDate: Dayjs
    selectedDays: Dayjs[]
    handleChange: (type: 'start' | 'end' | 'selected', payload: Dayjs | Dayjs[]) => void
}

function SeveralDays({
  startDate, endDate, selectedDays, handleChange,
}: Props) {
  const handleStart = useCallback((value: Dayjs | null) => {
    if (value) {
      handleChange('start', value);
    }
  }, []);

  const handleEnd = useCallback((value: Dayjs | null) => {
    if (value) {
      handleChange('end', value);
    }
  }, []);

  const handleSelect = useCallback((value: Dayjs[]) => {
    handleChange('selected', value);
  }, []);

  return (
    <Box sx={{
      marginTop: '1rem',
    }}
    >
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '0.4rem',
      }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="DD/MM/YYYY"
            value={startDate}
            onChange={handleStart}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="DD/MM/YYYY"
            value={endDate}
            onChange={handleEnd}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Box><ToggleDays days={selectedDays} setDays={handleSelect} /></Box>
    </Box>
  );
}

export default SeveralDays;
