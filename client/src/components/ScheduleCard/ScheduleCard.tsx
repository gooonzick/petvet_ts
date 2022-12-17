import { memo, useCallback } from 'react';

import { Box } from '@mui/material';

import { parentBoxStyle } from './styles';
import { Scheules } from '@/models/models';
import { useUpdateScheduleMutation, useDeleteScheduleMutation } from '@/redux/api/schedules.api';
import ScheduledCard from './blocks/ScheduledCard';
import EmptyCard from './blocks/EmptyCard';

type Props = {
  schudleItem: Scheules
};

function ScheduleCard({ schudleItem }: Props) {
  const [deleteSchedule, { isLoading: isDeleting }] = useDeleteScheduleMutation();
  const [cancelSchedule, { isLoading: isCanceling }] = useUpdateScheduleMutation();

  const startVisit = useCallback(() => {

  }, []);

  const cancelVisit = useCallback(() => {
    const { user, pet, ...data } = schudleItem;
    const updatedItem: Scheules = {
      ...data,
      userId: null,
      petId: null,
    };
    cancelSchedule(updatedItem);
  }, [cancelSchedule, schudleItem]);

  const deleteSlot = useCallback(() => {
    deleteSchedule(schudleItem.id);
  }, [deleteSchedule, schudleItem.id]);

  const isEmptySlot = Boolean(schudleItem.pet && schudleItem.user);

  const childNode = isEmptySlot
    ? (
      <ScheduledCard
        schudleItem={schudleItem}
        startVisit={startVisit}
        cancelVisit={cancelVisit}
        isCanceling={isCanceling}
      />
    )
    : (
      <EmptyCard
        schudleItem={schudleItem}
        deleteSlot={deleteSlot}
        isDeleting={isDeleting}
      />
    );

  return (
    <Box sx={parentBoxStyle}>
      {childNode}
    </Box>
  );
}

export default memo(ScheduleCard);
