import {
  useCallback, useState,
} from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { Box, Button, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import ScheduleSlots from './blocks/ScheduleSlots';
import TimeSlots from './blocks/TimeSlots';
import ToggleDays from './blocks/ToggleDays';

import {
  buttonsContainer,
  calcButton,
  container, datePickersContainer, timePickerContainer, timeSlotsContainer, weekdayToggleContainer,
} from './styles';

import getSlots from './helpers/getSlots';

type Props = {
  newScheduleSlots: Dayjs[];
  setSlots: (value: Dayjs[]) => void;
  deleteSlot: (slotInde: number) => void;
};

function SeveralDays({
  newScheduleSlots, deleteSlot, setSlots,
}: Props) {
  const [startDate, setStartDate] = useState<Dayjs>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs>(dayjs().add(7, 'day'));
  const [weekdays, setWeekdays] = useState<number[]>([]);
  const [timeSlots, setTimeSlots] = useState<Dayjs[]>([]);
  const [timeValue, setTimeValue] = useState<Dayjs | null>(null);

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
    <Box sx={container}>
      <Box sx={datePickersContainer}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="???????? ????????????"
            inputFormat="DD/MM/YYYY"
            value={startDate}
            onChange={handleStart}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
          <DesktopDatePicker
            label="???????? ??????????"
            inputFormat="DD/MM/YYYY"
            value={endDate}
            onChange={handleEnd}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={timePickerContainer}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="??????????"
            value={timeValue}
            onChange={(value) => setTimeValue(value)}
            onAccept={handleTimeAccept}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={timeSlotsContainer}>
        <TimeSlots data={timeSlots} deleteHandler={removeTimeValue} />
      </Box>
      <Box sx={weekdayToggleContainer}>
        <ToggleDays days={weekdays} setDays={handleWeekday} />
      </Box>
      <Box sx={timeSlotsContainer}>
        <ScheduleSlots data={newScheduleSlots} deleteHandler={deleteSlot} />
      </Box>
      <Box sx={buttonsContainer}>
        <Button
          variant="contained"
          disabled={isDisable.calc}
          onClick={calcSlots}
          sx={calcButton}
        >
          ?????????????? ????????
        </Button>
      </Box>
    </Box>
  );
}

export default SeveralDays;
