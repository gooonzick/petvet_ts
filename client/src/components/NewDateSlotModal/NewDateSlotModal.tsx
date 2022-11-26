import { useCallback, useState } from 'react';

import { Box, Typography } from '@mui/material';

import { Dayjs } from 'dayjs';

import SeveralDays from './blocks/SeveralDays';
import SelectType from './blocks/SelectType';

import NewSlotType from './types';
import SingleDay from './blocks/SingleDay';
import { contentWrapper } from './styles';

type Props = {
    onResult: (days: Dayjs[]) => void;
}

function NewDateSlotModal({ onResult }:Props) {
  const [slotType, setSlotType] = useState(NewSlotType.default);
  const [newScheduleSlots, setNewScheduleSlots] = useState<Dayjs[]>([]);

  const calcSlots = useCallback((value: Dayjs[]) => {
    setNewScheduleSlots(value);
  }, [setNewScheduleSlots]);

  const deleteSlot = useCallback((slotIndex: number) => {
    setNewScheduleSlots((prev) => prev.filter((_, index) => slotIndex !== index));
  }, [setNewScheduleSlots]);

  const renderPicker = useCallback(() => {
    if (slotType === NewSlotType.severalDays) {
      return (
        <SeveralDays
          newScheduleSlots={newScheduleSlots}
          onResult={onResult}
          setSlots={calcSlots}
          deleteSlot={deleteSlot}
        />
      );
    }
    if (slotType === NewSlotType.singleDay) {
      return (
        <SingleDay onResult={onResult} />
      );
    }
    return null;
  }, [slotType, newScheduleSlots, calcSlots, deleteSlot]);

  return (
    <Box sx={contentWrapper}>
      <Typography variant="h6" component="h2" sx={{ marginBottom: '1rem' }}>
        Добавить новые окна для записи
      </Typography>
      <SelectType type={slotType} setType={setSlotType} />
      {renderPicker()}
    </Box>
  );
}

export default NewDateSlotModal;
