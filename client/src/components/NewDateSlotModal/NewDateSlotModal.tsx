import { useCallback, useState } from 'react';
import { Dayjs } from 'dayjs';

import { Box, Button, Typography } from '@mui/material';

import SelectType from './blocks/SelectType';
import SeveralDays from './blocks/SeveralDays';
import SingleDay from './blocks/SingleDay';

import { useCreateNewSchedulesMutation } from '@/redux/api/schedules.api';

import NewSlotType from './types';

import * as styles from './styles';

import shceduleAdapter from './helpers/scheduleAdapter';

type Props = {
  onResult: () => void;
};

function NewDateSlotModal({ onResult }:Props) {
  const [slotType, setSlotType] = useState(NewSlotType.default);
  const [newScheduleSlots, setNewScheduleSlots] = useState<Dayjs[]>([]);
  const [createSchedules, { isLoading }] = useCreateNewSchedulesMutation();

  const calcSlots = useCallback((value: Dayjs[]) => {
    setNewScheduleSlots(value);
  }, [setNewScheduleSlots]);

  const deleteSlot = useCallback((slotIndex: number) => {
    setNewScheduleSlots((prev) => prev.filter((_, index) => slotIndex !== index));
  }, [setNewScheduleSlots]);

  const submitSlots = useCallback(async () => {
    await createSchedules(shceduleAdapter(newScheduleSlots));
    onResult();
  }, [createSchedules, newScheduleSlots]);

  const renderPicker = useCallback(() => {
    if (slotType === NewSlotType.severalDays) {
      return (
        <SeveralDays
          newScheduleSlots={newScheduleSlots}
          setSlots={calcSlots}
          deleteSlot={deleteSlot}
        />
      );
    }
    if (slotType === NewSlotType.singleDay) {
      return (
        <SingleDay calcSlots={calcSlots} />
      );
    }
    return null;
  }, [slotType, newScheduleSlots, calcSlots, deleteSlot]);

  const isDisable = Boolean(newScheduleSlots.length === 0 || isLoading);

  return (
    <Box sx={styles.contentWrapper}>
      <Typography variant="h6" component="h2" sx={styles.title}>
        Добавить новые окна для записи
      </Typography>
      <SelectType type={slotType} setType={setSlotType} />
      {renderPicker()}
      <Button
        variant="contained"
        disabled={isDisable}
        onClick={submitSlots}
        sx={styles.submitButton}
      >
        Подтвердить
      </Button>
    </Box>
  );
}

export default NewDateSlotModal;
