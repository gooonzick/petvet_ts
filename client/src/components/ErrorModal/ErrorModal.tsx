import {
  Box, Button, Modal, Typography, Stack,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { hideError } from '../../redux/slices/errorSlice';
import { RootState } from '../../redux/store';

const boxStyle = {
  width: '40%',
  height: 'max-content',
  margin: 'auto',
  marginTop: '20%',
  backgroundColor: 'white',
  borderRadius: '0.5rem',
  padding: '1rem',
};

const headerStyle = {
  margin: 'auto', width: 'max-content', fontWeight: 'bold',
};

function ErrorModal() {
  const { isError, errorMessage } = useSelector((store: RootState) => store.error);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideError());
  };

  return (
    <Modal
      open={isError}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={handleClose}
    >
      <Box sx={boxStyle}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={headerStyle}
        >
          Ошибка
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {errorMessage}
        </Typography>
        <Stack direction="row-reverse" sx={{ mt: '0.7rem' }}>
          <Button variant="contained" sx={{ width: 'max-content' }} onClick={handleClose}>Закрыть</Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default ErrorModal;
