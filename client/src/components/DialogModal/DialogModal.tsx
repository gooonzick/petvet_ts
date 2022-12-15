import { useCallback } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  Box, Button, Stack, Typography,
} from '@mui/material';
import { RootState } from '@/redux/types';
import { closeDialog } from '@/redux/slices/dialogSlice';
import { contentWrapper, headerStyle } from './styles';

type Props = {
  message: string | null;
  // eslint-disable-next-line react/require-default-props
  confirm?: () => void;
};

function mapStateToProps(state: RootState) {
  const { dialog: { message, confirm } } = state;
  return { message, confirm };
}

function DialogModal({ message, confirm }: Props) {
  const dispatch = useDispatch();

  const confirmHandler = useCallback(() => {
    if (confirm) {
      confirm();
    }
    dispatch(closeDialog());
  }, []);

  const cancelHandler = useCallback(() => {
    dispatch(closeDialog());
  }, [dispatch]);

  return (
    <Box sx={contentWrapper}>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={headerStyle}
      >
        Подтвердите действие
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {message}
      </Typography>
      <Stack direction="row-reverse" sx={{ mt: '0.7rem' }} spacing={1}>
        <Button
          variant="contained"
          sx={{ width: 'max-content' }}
          onClick={confirmHandler}
        >
          Подтвердить
        </Button>
        <Button
          variant="contained"
          sx={{ width: 'max-content' }}
          onClick={cancelHandler}
          color="error"
        >
          Отмена
        </Button>
      </Stack>
    </Box>
  );
}

export default connect(mapStateToProps)(DialogModal);
