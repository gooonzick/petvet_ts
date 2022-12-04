import React, { useCallback } from 'react';

import { Box, Button, Typography } from '@mui/material';

import dayjs from 'dayjs';

import { useDispatch } from 'react-redux';
import { parentBoxStyle } from './styles';
import { Scheules } from '@/models/models';
import { useUpdateScheduleMutation, useDeleteScheduleMutation } from '@/redux/api/schedules.api';
import { showDialog } from '@/redux/slices/dialogSlice';

type Props = {
  schudleItem: Scheules
};

const deleteAsk = 'Вы уверены что хотите удалить слот?';
const cancelAsk = 'Вы уверены что хотите отменить запись?';

function ScheduleCard({ schudleItem }: Props) {
  const [deleteSchedule, { isLoading: isDeleting }] = useDeleteScheduleMutation();
  const [cancelSchedule, { isLoading: isCanceling }] = useUpdateScheduleMutation();

  const dispatch = useDispatch();

  const startVisit = useCallback(() => {

  }, []);

  const cancelVisit = useCallback(() => {
    const { user, pet, ...data } = schudleItem;
    const updatedItem: Scheules = {
      ...data,
      userId: null,
      petId: null,
    };
    dispatch(showDialog({ message: cancelAsk, confirm: () => cancelSchedule(updatedItem) }));
  }, [cancelSchedule, dispatch, schudleItem]);

  const deleteSlot = useCallback(() => {
    dispatch(showDialog({ message: deleteAsk, confirm: () => deleteSchedule(schudleItem.id) }));
  }, [deleteSchedule, dispatch, schudleItem.id]);

  const renderCardBody = useCallback(() => {
    if (schudleItem.pet && schudleItem.user) {
      return (
        <>
          <Box>
            <Typography variant="h5">
              {`${dayjs(schudleItem.dateOfReceipt).format('DD.MM.YYYY HH:mm')}`}
            </Typography>
            <Typography variant="h5">
              {`${schudleItem.user.name}`}
            </Typography>
            <Typography variant="h6">
              {`Питомец ${schudleItem.pet.name} (${schudleItem.pet.specie})`}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Button variant="contained" onClick={() => startVisit()}>
              Начать прием
            </Button>
            <Button
              variant="contained"
              onClick={cancelVisit}
              color="error"
              disabled={isCanceling}
            >
              Отменить запись
            </Button>
          </Box>
        </>
      );
    }

    return (
      <>
        <Box>
          <Typography variant="h5">
            {`${dayjs(schudleItem.dateOfReceipt).format('DD.MM.YYYY HH:mm')}`}
          </Typography>
          <Typography variant="h5">
            На это время ещё никто не записался
          </Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            onClick={deleteSlot}
            color="warning"
            disabled={isDeleting}
          >
            Удалить запись
          </Button>
        </Box>
      </>
    );
  }, [
    cancelVisit,
    deleteSchedule,
    isCanceling,
    isDeleting,
    schudleItem,
    schudleItem,
    schudleItem,
    schudleItem,
    startVisit,
  ]);

  return (
    <Box sx={parentBoxStyle}>
      {renderCardBody()}
    </Box>
  );
}

export default ScheduleCard;
