import { memo } from 'react';
import dayjs from 'dayjs';

import { Box, Button, Typography } from '@mui/material';

import Popconfirm from '@/components/Popconfirm';

import { Scheules } from '@/models/models';

import { cancelAsk } from '../../helpers/constants';

type Props = {
  schudleItem: Scheules;
  startVisit: VoidFunction;
  cancelVisit: VoidFunction;
  isCanceling: boolean;
};

function ScheduledCard({
  schudleItem, startVisit, cancelVisit, isCanceling,
}: Props) {
  return (
    <>
      <Box>
        <Typography variant="h5">
          {`${dayjs(schudleItem.dateOfReceipt).format('DD.MM.YYYY HH:mm')}`}
        </Typography>
        <Typography variant="h5">
          {`${schudleItem.user!.name}`}
        </Typography>
        <Typography variant="h6">
          {`Питомец ${schudleItem.pet!.name} (${schudleItem.pet!.specie})`}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Button variant="contained" onClick={startVisit}>
          Начать прием
        </Button>
        <Popconfirm
          message={cancelAsk}
          confirm={cancelVisit}
          variant="contained"
          color="error"
          disabled={isCanceling}
        >
          Отменить запись
        </Popconfirm>
      </Box>
    </>
  );
}

export default memo(ScheduledCard);
