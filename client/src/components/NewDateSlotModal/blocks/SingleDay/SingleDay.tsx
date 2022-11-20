/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useState } from 'react';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { Box, Button, TextField } from '@mui/material';

type Props = {
  onResult: (days: Dayjs[]) => void;
}

function SingleDay({ onResult }: Props) {
  const [scheduleSlot, setSceduleSlot] = useState<Dayjs|null>(null);

  const onChange = useCallback((value: Dayjs | null) => {
    setSceduleSlot(value);
  }, [setSceduleSlot]);

  const onSubmit = useCallback(() => {
    if (scheduleSlot) {
      onResult([scheduleSlot]);
    }
  }, [scheduleSlot]);

  const isDisable = !scheduleSlot;

  return (
    <Box>
      <Box sx={{ marginTop: '1rem' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            value={scheduleSlot}
            onChange={onChange}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={{ marginTop: '1rem' }}>
        <Button
          sx={{ display: 'block', marginLeft: 'auto' }}
          disabled={isDisable}
          variant="contained"
          onClick={onSubmit}
        >
          Создать запись

        </Button>
      </Box>
    </Box>
  );
}

export default SingleDay;
