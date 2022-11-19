import { useCallback, useEffect, useState } from 'react';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import dayjs, { Dayjs } from 'dayjs';
import SelectType from './blocks/SelectType';

import NewSlotType from './types';
import SeveralDays from './blocks/SeveralDays';

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
    open: boolean
    onClose: () => void
}

function NewDateSlotModal({ open, onClose }:Props) {
  const [slotType, setSlotType] = useState(NewSlotType.default);
  const [newScheduleSlots, setNewScheduleSlots] = useState<Dayjs[]>([]);

  const submitSlots = useCallback((value: Dayjs[]) => {
    setNewScheduleSlots(value);
  }, [setNewScheduleSlots]);

  const deleteSlot = useCallback((slotIndex: number) => {
    setNewScheduleSlots((prev) => prev.filter((_, index) => slotIndex !== index));
  }, [setNewScheduleSlots]);

  const closeHandler = useCallback(() => {
    setSlotType(NewSlotType.default);
    setNewScheduleSlots([]);
    onClose();
  }, [onClose, setNewScheduleSlots]);

  const renderDatePicker = useCallback(() => {
    if (slotType === NewSlotType.severalDays) {
      return (
        <SeveralDays
          newScheduleSlots={newScheduleSlots}
          setSlots={submitSlots}
          deleteSlot={deleteSlot}
        />
      );
    }
    if (slotType === NewSlotType.singleDay) {
      return (
        <div>Bla</div>
      );
    }
    return <div>Choose type</div>;
  }, [slotType, newScheduleSlots, submitSlots, deleteSlot]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" sx={{ marginBottom: '1rem' }}>
            Добавить новые окна для записи
          </Typography>
          <SelectType type={slotType} setType={setSlotType} />
          {renderDatePicker()}
        </Box>
      </Fade>
    </Modal>
  );
}

export default NewDateSlotModal;
