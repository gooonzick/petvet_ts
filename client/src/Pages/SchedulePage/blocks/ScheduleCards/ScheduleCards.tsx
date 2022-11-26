import dayjs, { Dayjs } from 'dayjs';
import { useMemo } from 'react';
import { Scheules } from '@/models/models';
import ScheduleCard from '@/components/ScheduleCard/ScheduleCard';

type Props = {
    data: Scheules[] | undefined;
    day: Dayjs
}

function ScheduleCards({ data, day }: Props) {
  if (!data) {
    return null;
  }

  const fiteredDays = useMemo(() => data.filter((el) => {
    const diff = Math.abs(dayjs(el.dateOfReceipt).diff(day, 'hours'));
    const diffDays = Math.floor(diff / 24);

    return diffDays === 0;
  }), [data]);
  console.log(fiteredDays.map((el) => dayjs(el.dateOfReceipt)));

  return (
    <div>
      {fiteredDays.map((scheduleItem) => (
        <ScheduleCard key={scheduleItem.dateOfReceipt} schudleItem={scheduleItem} />
      ))}
    </div>
  );
}

export default ScheduleCards;
