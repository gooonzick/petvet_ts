import { useCallback, useState } from 'react';

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
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

type Props = {
    open: boolean
    onClose: () => void
}

function NewDateSlotModal({ open, onClose }:Props) {
  const [slotType, setNewSlotType] = useState(NewSlotType.default);
  const [startDate, setStartDate] = useState<Dayjs>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs>(dayjs().add(1, 'day'));
  const [selectedDays, setSelectedDays] = useState<Dayjs[]>([]);

  const handleChange = useCallback((type: 'start' | 'end' | 'selected', payload: Dayjs | Dayjs[]) => {
    if (type === 'start' && !Array.isArray(payload)) setStartDate(payload);
    if (type === 'end' && !Array.isArray(payload)) setEndDate(payload);
    if (type === 'selected' && Array.isArray(payload)) setSelectedDays(payload);
  }, [setStartDate, setEndDate, setSelectedDays]);

  const renderDatePicker = useCallback(() => {
    if (slotType === NewSlotType.severalDays) {
      return (
        <SeveralDays
          startDate={startDate}
          endDate={endDate}
          selectedDays={selectedDays}
          handleChange={handleChange}
        />
      );
    }
    if (slotType === NewSlotType.singleDay) {
      return (
        <div>Bla</div>
      );
    }
    return <div>Choose type</div>;
  }, [slotType, startDate, endDate, selectedDays, handleChange]);

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
          <Typography variant="h6" component="h2">
            Добавить новые окна для записи
          </Typography>
          <SelectType type={slotType} setType={setNewSlotType} />
          {renderDatePicker()}
        </Box>
      </Fade>
    </Modal>
  );
}

export default NewDateSlotModal;
