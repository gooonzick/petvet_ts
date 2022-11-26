import React, { useCallback } from 'react';

import { Box, Button, Typography } from '@mui/material';

import dayjs from 'dayjs';

import { parentBoxStyle } from './styles';
import { Scheules } from '@/models/models';

type Props = {
    schudleItem: Scheules
}

function ScheduleCard({ schudleItem }: Props) {
  const startVisit = useCallback(() => {

  }, []);

  const cancelVisit = useCallback(() => {

  }, []);

  const deleteVisit = useCallback(() => {

  }, []);

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
            <Button variant="contained" onClick={() => cancelVisit()} color="error">
              Отменить запись
            </Button>
            <Button variant="contained" onClick={() => deleteVisit()} color="warning">
              Удалить запись
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
          <Button variant="contained" onClick={() => startVisit()} color="warning">
            Удалить запись
          </Button>
        </Box>
      </>
    );
  }, [schudleItem, startVisit, deleteVisit, cancelVisit]);

  return (
    <Box sx={parentBoxStyle}>
      {renderCardBody()}
    </Box>
  );
}

export default ScheduleCard;
