import { useCallback, useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Box, Button } from '@mui/material';
import { Scheules } from '@/models/models';
import DatePicker from './blocks/DatePicker/DatePicker';
import { mainBoxStyle } from './styles';

type Props = {
  schedules: Scheules[];
};

function Schedule({ schedules }: Props) {
  const [date, setDate] = useState<Dayjs | null>(null);

  const handleChangeDate = useCallback((value: Dayjs | null) => {
    setDate(value);
  }, []);

  const enrollItems = useMemo(() => {
    if (!date) {
      return <div>Выберите дату</div>;
    }

    return schedules
      .filter(({ dateOfReceipt }) => dayjs(date).isSame(dateOfReceipt, 'date'))
      .map((schedule) => {
        const isDisabled = Boolean(schedule.userId);
        const buttonText = dayjs(schedule.dateOfReceipt).format('HH:mm');
        return (
          <Button
            key={schedule.id}
            disabled={isDisabled}
            variant="contained"
          >
            {buttonText}
          </Button>
        );
      });
  }, [date, schedules]);

  console.log(schedules
    .filter(({ dateOfReceipt }) => dayjs(date).isSame(dateOfReceipt, 'date')));

  return (
    <Box sx={mainBoxStyle}>
      <DatePicker value={date} onChange={handleChangeDate} />
      <Box sx={{
        marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '4px',
      }}
      >
        {enrollItems}
      </Box>
    </Box>
  );
}

export default Schedule;
