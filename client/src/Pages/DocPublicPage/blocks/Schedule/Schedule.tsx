import { useCallback, useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { Box, Button } from '@mui/material';

import DatePicker from '@/components/DatePicker';
import PetPicker from '@/components/PetPicker';

import { Scheules } from '@/models/models';

import { mainBoxStyle } from './styles';

type Props = {
  schedules: Scheules[];
};

function Schedule({ schedules }: Props) {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<number | null>(null);
  const [currentPet, setCurrentPet] = useState<number | null>(null);

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
            onClick={() => setSelectedSchedule(schedule.id)}
          >
            {buttonText}
          </Button>
        );
      });
  }, [date, schedules]);

  const isDisabled = Boolean(!currentPet && !selectedSchedule);

  return (
    <Box sx={mainBoxStyle}>
      <DatePicker value={date} onChange={handleChangeDate} />
      <Box sx={{
        marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '4px',
      }}
      >
        {enrollItems}
        {selectedSchedule && (
        <PetPicker
          setPet={setCurrentPet}
          currentPet={currentPet}
        />
        )}
      </Box>
      <Button
        variant="contained"
        disabled={isDisabled}
        sx={{
          display: 'block',
          marginTop: '1rem',
          marginLeft: 'auto',
        }}
      >
        Записаться
      </Button>
    </Box>
  );
}

export default Schedule;
