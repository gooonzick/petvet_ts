import { memo } from 'react';
import { connect } from 'react-redux';

import {
  Box, Button, Modal, Stack,
  Typography,
} from '@mui/material';

import { hideError } from '@/redux/slices/errorSlice';

import { boxStyle, headerStyle } from './styles';

import { errorTextSelecotor, isErrorSelecotr } from '@/redux/selectors/errorSelector';
import type { AppDispatch, RootState } from '@/redux/types';

type Props = {
  isError: boolean;
  errorMessage: string | null;
  dispatch: AppDispatch;
};

const mapStateToProps = (state: RootState) => {
  const isError = isErrorSelecotr(state);
  const errorMessage = errorTextSelecotor(state);

  return { isError, errorMessage };
};

function ErrorModal({ dispatch, errorMessage, isError }: Props) {
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

export default connect(mapStateToProps)(memo(ErrorModal));
