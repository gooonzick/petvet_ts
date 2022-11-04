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
  return (
    <Box sx={parentBoxStyle}>
      <Box>
        <Typography variant="h5">
          {`${dayjs(schudleItem.dateOfReceipt).format('DD/MM/YYYY HH:mm')}`}
        </Typography>
        <Typography variant="h5">
          {`${schudleItem.user.name}`}
        </Typography>
        <Typography variant="h6">
          {`Питомец ${schudleItem.pet.name} (${schudleItem.pet.specie})`}
        </Typography>
      </Box>
      <Box>
        <Button variant="contained" onClick={() => startVisit()}>
          Начать прием
        </Button>
      </Box>
    </Box>
  );
}

export default ScheduleCard;
