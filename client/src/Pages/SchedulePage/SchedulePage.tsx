import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { mainBox } from './styles';
import Calendar from '@/components/Calendar/Calendar';
import { useGetAllSchedulesQuery } from '@/redux/api/schedules.api';
import ScheduleCard from '@/components/ScheduleCard/ScheduleCard';

function SchedulePage() {
  const [day, setDay] = useState<Dayjs>(dayjs());
  const { data } = useGetAllSchedulesQuery(day.format('YYYY-MM-DD'));

  console.log(data);

  return (
    <Box sx={mainBox}>
      <Calendar
        date={day}
        setDate={setDay}
        busyDays={[{ date_of_receipt: dayjs('2022-10-26') }, { date_of_receipt: dayjs('2022-10-27') }]}
      />
      {data
      && data.length > 0
      && data.map((scheduleItem) => <ScheduleCard schudleItem={scheduleItem} />)}
    </Box>
  );
}

export default SchedulePage;
