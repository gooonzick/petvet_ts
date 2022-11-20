import { useCallback, useState } from 'react';

import {
  Backdrop, Box, Button, Fade, Modal,
} from '@mui/material';

import dayjs, { Dayjs } from 'dayjs';
import { useGetAllSchedulesQuery, usePostNewSchedulesMutation } from '@/redux/api/schedules.api';

import Calendar from '@/components/Calendar/Calendar';
import ScheduleCard from '@/components/ScheduleCard/ScheduleCard';
import NewDateSlotModal from '@/components/NewDateSlotModal';

import { dateSlotButtonStyle, mainBox } from './styles';
import shceduleAdapter from './helpers/scheduleAdapter';

function SchedulePage() {
  const [day, setDay] = useState<Dayjs>(dayjs());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, refetch } = useGetAllSchedulesQuery(day.format('YYYY-MM-DD'));
  const [createSchedules] = usePostNewSchedulesMutation();

  const openModalHandler = useCallback(() => {
    setIsModalOpen(true);
  }, [isModalOpen, setIsModalOpen]);

  const closeModalHandler = useCallback(() => {
    setIsModalOpen(false);
  }, [isModalOpen, setIsModalOpen]);

  const submitSlots = useCallback(async (days: Dayjs[]) => {
    await createSchedules(shceduleAdapter(days));
    refetch();
  }, [createSchedules]);

  return (
    <Box sx={mainBox}>
      <Box sx={dateSlotButtonStyle}>
        <Calendar
          selectedDate={day}
          setSelectedDate={setDay}
          busyDays={[{ date_of_receipt: dayjs('2022-10-26') }, { date_of_receipt: dayjs('2022-10-27') }]}
        />
        <Button variant="contained" onClick={openModalHandler}>Добавить слот</Button>
      </Box>
      {data
      && data.length > 0
      && data.map((scheduleItem) => <ScheduleCard schudleItem={scheduleItem} />)}
      <Modal
        open={isModalOpen}
        onClose={closeModalHandler}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isModalOpen}>
          <div>
            <NewDateSlotModal onResult={submitSlots} />
          </div>
        </Fade>
      </Modal>
    </Box>
  );
}

export default SchedulePage;
