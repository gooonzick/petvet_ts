import {
  Box, Button, Modal, SxProps, Theme,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { Pet } from '../../models/models';
import NewPetInfo from '../NewPetInfo/NewPetInfo';

type Props = {
  pet: Pet
}

const parentBoxStyle: SxProps<Theme> = {
  width: { xs: '100%', sm: '100%', md: '70%' },
  maxWidth: '40rem',
  height: 'max-content',
  display: 'flex',
  flexFlow: 'column',
  padding: '1.5rem 1.5rem 3.5rem 1.5rem',
  boxSizing: 'border-box',
  alignItems: { xs: 'center', sm: 'center', md: 'start' },
};

const modalStyle: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid rgba(0,0,0,0.3)',
  borderRadius: 2,
  boxShadow: 24,
  padding: 4,
};

function AddNewInfo({ pet }: Props) {
  const [modal, setModal] = useState(false);

  const closeModalHandler = useCallback(() => {
    setModal(false);
  }, []);

  const openModalHandler = useCallback(() => {
    setModal(true);
  }, []);

  return (
    <Box sx={parentBoxStyle}>
      <Button variant="contained" onClick={() => openModalHandler()}>Добавить новую запись</Button>
      <Modal
        open={modal}
        onClose={closeModalHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <NewPetInfo />
      </Modal>
    </Box>
  );
}

export default AddNewInfo;
