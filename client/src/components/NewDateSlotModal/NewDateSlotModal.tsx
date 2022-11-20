import { useCallback, useState } from 'react';

import { Box, Typography } from '@mui/material';

import { Dayjs } from 'dayjs';

import SeveralDays from './blocks/SeveralDays';
import SelectType from './blocks/SelectType';

import NewSlotType from './types';
import SingleDay from './blocks/SingleDay';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: '500px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

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
    return <div>Choose type</div>;
  }, [slotType, newScheduleSlots, calcSlots, deleteSlot]);

  return (
    <Box sx={style}>
      <Typography variant="h6" component="h2" sx={{ marginBottom: '1rem' }}>
        Добавить новые окна для записи
      </Typography>
      <SelectType type={slotType} setType={setSlotType} />
      {renderPicker()}
    </Box>
  );
}

export default NewDateSlotModal;
