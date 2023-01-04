import dayjs from 'dayjs';

import { Box, Typography } from '@mui/material';

import Popconfirm from '@/components/Popconfirm';

import { Scheules } from '@/models/models';

import { deleteAsk } from '../../helpers/constants';

type Props = {
  schudleItem: Scheules;
  deleteSlot: VoidFunction;
  isDeleting: boolean;
};

function EmptyCard({ schudleItem, deleteSlot, isDeleting }: Props) {
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
        <Popconfirm
          message={deleteAsk}
          confirm={deleteSlot}
          variant="contained"
          color="warning"
          disabled={isDeleting}
        >
          Удалить запись
        </Popconfirm>
      </Box>
    </>
  );
}

export default EmptyCard;
