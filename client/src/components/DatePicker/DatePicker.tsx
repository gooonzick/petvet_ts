import {
  TextField, useMediaQuery, useTheme,
} from '@mui/material';
import {
  DesktopDatePicker, LocalizationProvider, MobileDatePicker, PickersDay, PickersDayProps,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { memo, useCallback, useMemo } from 'react';
import { dayStyle } from './styles';

type Props = {
  value: null | Dayjs;
  onChange: (value: Dayjs | null) => void;
  label?: string;
  inputFormat?: string;
  busyDays?: Dayjs[]
};

function DatePicker({
  value,
  onChange,
  inputFormat = 'MM/DD/YYYY',
  label = 'Введите дату',
  busyDays = [],
}: Props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const renderDay = useCallback((
    day: Dayjs,
    selectedDays: Array<Dayjs | null>,
    DayProps: PickersDayProps<Dayjs>,
  ) => {
    const isVisit = busyDays && busyDays
      .some((busyDay) => day.isSame(busyDay, 'day'));

    if (isVisit) {
      return (
        <PickersDay {...DayProps} style={dayStyle.dayWithDotContainer}>
          {day.date()}
          <div style={dayStyle.dayWithDot} />
        </PickersDay>
      );
    }
    return <PickersDay {...DayProps}>{day.date()}</PickersDay>;
  }, [busyDays]);

  const datePickerNode = useMemo(() => {
    if (matches) {
      return (
        <MobileDatePicker
          label={label}
          inputFormat={inputFormat}
          value={value}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} fullWidth />}
          renderDay={renderDay}
        />
      );
    }
    return (
      <DesktopDatePicker
        label={label}
        inputFormat={inputFormat}
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} fullWidth />}
        renderDay={renderDay}
      />
    );
  }, [inputFormat, label, matches, onChange, renderDay, value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {datePickerNode}
    </LocalizationProvider>
  );
}

export default memo(DatePicker);
