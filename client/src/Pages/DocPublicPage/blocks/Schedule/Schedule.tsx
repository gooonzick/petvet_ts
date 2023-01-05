import { useCallback, useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { Box, Button } from '@mui/material';

import DatePicker from '@/components/DatePicker';
import PetPicker from '@/components/PetPicker';

import { useUpdateScheduleMutation } from '@/redux/api/schedules.api';

import { Scheules } from '@/models/models';

import * as styles from './styles';

type Props = {
  schedules: Scheules[];
  docId: string | undefined;
  userId: number | undefined;
  onResult: VoidFunction;
};

function Schedule({
  schedules, docId, userId, onResult,
}: Props) {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<Scheules | null>(null);
  const [currentPet, setCurrentPet] = useState<number | null>(null);

  const [assign, { isLoading }] = useUpdateScheduleMutation();

  const onSubmit = useCallback(() => {
    if (selectedSchedule && currentPet && docId && userId) {
      assign({
        ...selectedSchedule,
        petId: currentPet,
        userId,
      }).then((_) => onResult());
    }
  }, [assign, currentPet, docId, onResult, selectedSchedule, userId]);

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
            onClick={() => setSelectedSchedule(schedule)}
          >
            {buttonText}
          </Button>
        );
      });
  }, [date, schedules]);

  const isDisabled = Boolean((!currentPet && !selectedSchedule) || isLoading);

  return (
    <Box sx={styles.mainBoxStyle}>
      <DatePicker value={date} onChange={handleChangeDate} />
      <Box sx={styles.petPickerContainer}>
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
        sx={styles.submitButton}
        onClick={onSubmit}
      >
        Записаться
      </Button>
    </Box>
  );
}

export default Schedule;
