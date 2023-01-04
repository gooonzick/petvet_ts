import { useCallback, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import {
  Box, Button, Modal,
} from '@mui/material';

import Calendar from '@/components/Calendar/Calendar';
import NewDateSlotModal from '@/components/NewDateSlotModal';

import ScheduleCards from './blocks/ScheduleCards';

import { useGetAllSchedulesQuery } from '@/redux/api/schedules.api';

import { dateSlotButtonStyle, mainBox } from './styles';

function SchedulePage() {
  const [day, setDay] = useState<Dayjs>(dayjs());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = useGetAllSchedulesQuery(day.format('YYYY-MM-DD'));

  const openModalHandler = useCallback(() => {
    setIsModalOpen(true);
  }, [setIsModalOpen]);

  const closeModalHandler = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const onResult = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <Box sx={mainBox}>
      <Box sx={dateSlotButtonStyle}>
        <Calendar
          selectedDate={day}
          setSelectedDate={setDay}
          busyDays={data}
        />
        <Button variant="contained" onClick={openModalHandler}>Добавить слот</Button>
      </Box>
      <ScheduleCards data={data} day={day} />
      <Modal
        open={isModalOpen}
        onClose={closeModalHandler}
      >
        <NewDateSlotModal onResult={onResult} />
      </Modal>
    </Box>
  );
}

export default SchedulePage;
