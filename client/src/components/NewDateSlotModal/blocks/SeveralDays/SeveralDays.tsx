/* eslint-disable react/jsx-props-no-spreading */
import { Box, Button, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import WordCard from '@/components/WordCard/WordCard';
import ToggleDays from './blocks/ToggleDays';
import getSlots from './helpers/getSlots';

type Props = {
  newScheduleSlots: Dayjs[];
  setSlots: (value: Dayjs[]) => void;
  deleteSlot: (slotInde: number) => void;
}

function SeveralDays({ newScheduleSlots, deleteSlot, setSlots }: Props) {
  const [startDate, setStartDate] = useState<Dayjs>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs>(dayjs().add(7, 'day'));
  const [weekdays, setWeekdays] = useState<number[]>([]);
  const [timeSlots, setTimeSlots] = useState<Dayjs[]>([]);
  const [timeValue, setTimeValue] = useState<Dayjs|null>(null);

  const isDisable = {
    calc: Boolean(weekdays.length === 0 || timeSlots.length === 0),
    submit: Boolean(newScheduleSlots.length === 0),
  };

  const handleStart = useCallback((value: Dayjs | null) => {
    if (value) {
      setStartDate(value);
    }
  }, [setStartDate]);

  const handleEnd = useCallback((value: Dayjs | null) => {
    if (value) {
      setEndDate(value);
    }
  }, [setEndDate]);

  const handleWeekday = useCallback((value: number[]) => {
    setWeekdays(value);
  }, [setWeekdays]);

  const handleTimeAccept = useCallback((value: Dayjs | null) => {
    if (value) {
      setTimeSlots((prev) => [...prev, value]);
    }
  }, [setTimeSlots]);

  const removeTimeValue = useCallback((timeSlotIndex: number) => {
    setTimeSlots((prev) => prev.filter((_, index) => timeSlotIndex !== index));
  }, []);

  const calcSlots = useCallback(() => {
    setSlots(getSlots(startDate, endDate, weekdays, timeSlots));
  }, [startDate, endDate, weekdays, timeSlots]);

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
          <DesktopDatePicker
            label="Дата конца"
            inputFormat="DD/MM/YYYY"
            value={endDate}
            onChange={handleEnd}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={{ marginTop: '0.5rem' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Время"
            value={timeValue}
            onChange={(value) => setTimeValue(value)}
            onAccept={handleTimeAccept}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap' }}>
        {timeSlots.map((el, index) => (
          <WordCard
            key={el.format()}
            text={`${el.get('hours')}:${el.get('minutes')}`}
            clearHandler={() => removeTimeValue(index)}
            editable
          />
        ))}
      </Box>
      <Box sx={{ marginTop: '1rem' }}>
        <ToggleDays days={weekdays} setDays={handleWeekday} />
      </Box>
      <Box sx={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap' }}>
        {newScheduleSlots.length > 0 && newScheduleSlots.map((el, index) => (
          <WordCard
            key={el.format()}
            text={el.format('DD/MM/YYYY HH:ss')}
            editable
            clearHandler={() => deleteSlot(index)}
          />
        ))}
      </Box>
      <Box sx={{ margin: '1rem auto 0 auto', textAlign: 'end' }}>
        <Button
          variant="contained"
          disabled={isDisable.submit}
          // onClick={onSubmit}
        >
          Подтвердить
        </Button>
        <Button
          variant="contained"
          disabled={isDisable.calc}
          onClick={calcSlots}
          sx={{ marginLeft: '1rem' }}
        >
          Вывести даты
        </Button>
      </Box>
    </Box>
  );
}

export default SeveralDays;
