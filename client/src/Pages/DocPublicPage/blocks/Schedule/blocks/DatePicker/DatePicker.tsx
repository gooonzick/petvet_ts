import {
  TextField, useMediaQuery, useTheme,
} from '@mui/material';
import { DesktopDatePicker, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { useMemo } from 'react';

type Props = {
  value: null | Dayjs
  onChange: (value: Dayjs | null) => void;
};

function DatePicker({
  value,
  onChange,
}: Props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const datePickerNode = useMemo(() => {
    if (matches) {
      return (
        <MobileDatePicker
          label="Date mobile"
          inputFormat="MM/DD/YYYY"
          value={value}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
      );
    }
    return (
      <DesktopDatePicker
        label="Date desktop"
        inputFormat="MM/DD/YYYY"
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} fullWidth />}
      />
    );
  }, [matches, onChange, value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {datePickerNode}
    </LocalizationProvider>
  );
}

export default DatePicker;
