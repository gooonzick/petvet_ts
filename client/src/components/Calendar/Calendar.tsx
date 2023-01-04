/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useState } from 'react';
import { Dayjs } from 'dayjs';

import TextField from '@mui/material/TextField';
import { MobileDatePicker, PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { styles } from './styles';

import { Props } from './types';

const isWeekend = (date: Dayjs) => {
  const day = date.day();

  return day === 0 || day === 6;
};

export default function Calendar({ selectedDate, setSelectedDate, busyDays }:Props) {
  const [date, setDate] = useState<Dayjs>(selectedDate);

  const renderDots = useCallback((
    day: Dayjs,
    selectedDays: Array<Dayjs | null>,
    DayProps: PickersDayProps<Dayjs>,
  ) => {
    const isVisit = busyDays && busyDays
      .some((el) => day.isSame(el.dateOfReceipt, 'day'));

    if (isVisit) {
      return (
        <PickersDay {...DayProps} style={styles.dayWithDotContainer}>
          {day.date()}
          <div style={styles.dayWithDot} />
        </PickersDay>
      );
    }
    return <PickersDay {...DayProps}>{day.date()}</PickersDay>;
  }, [busyDays]);

  const onChangeHandler = useCallback((newValue: Dayjs | null) => {
    if (newValue) {
      setDate(newValue.hour(0).minute(0).second(0));
    }
  }, [setDate]);

  const onAcceptHandler = useCallback(() => {
    setSelectedDate(date);
  }, [date, setSelectedDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        label="Дата приема"
        inputFormat="MM/DD/YYYY"
        value={date}
        onChange={onChangeHandler}
        onAccept={onAcceptHandler}
        renderInput={(params) => <TextField {...params} />}
        renderDay={renderDots}
      />
    </LocalizationProvider>
  );
}
