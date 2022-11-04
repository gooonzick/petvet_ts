import { useCallback, useState } from 'react';

import { Box, Button, Typography } from '@mui/material';

import dayjs, { Dayjs } from 'dayjs';

import { dateSlotButtonStyle, mainBox } from './styles';
import Calendar from '@/components/Calendar/Calendar';
import ScheduleCard from '@/components/ScheduleCard/ScheduleCard';
import NewDateSlotModal from '@/components/NewDateSlotModal';

import { useGetAllSchedulesQuery } from '@/redux/api/schedules.api';

function SchedulePage() {
  const [day, setDay] = useState<Dayjs>(dayjs());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = useGetAllSchedulesQuery(day.format('YYYY-MM-DD'));

  const openModalHandler = useCallback(() => {
    setIsModalOpen(true);
  }, [isModalOpen, setIsModalOpen]);

  const closeModalHandler = useCallback(() => {
    setIsModalOpen(false);
  }, [isModalOpen, setIsModalOpen]);

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
      <NewDateSlotModal open={isModalOpen} onClose={closeModalHandler} />
    </Box>
  );
}

export default SchedulePage;
