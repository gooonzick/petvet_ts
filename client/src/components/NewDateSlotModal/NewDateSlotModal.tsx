import { useState } from 'react';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import SelectType from './blocks/SelectType';

import NewSlotType from './types';

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
        </Box>
      </Fade>
    </Modal>
  );
}

export default NewDateSlotModal;
