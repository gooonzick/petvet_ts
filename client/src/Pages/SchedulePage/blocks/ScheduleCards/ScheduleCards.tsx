import dayjs, { Dayjs } from 'dayjs';
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

  const fiteredDays = data.filter((el) => {
    const diff = Math.abs(dayjs(el.dateOfReceipt).diff(day, 'hours'));
    const diffDays = Math.floor(diff / 24);

    return diffDays === 0;
  });

  return (
    <div>
      {fiteredDays.map((scheduleItem) => (
        <ScheduleCard key={scheduleItem.dateOfReceipt} schudleItem={scheduleItem} />
      ))}
    </div>
  );
}

export default ScheduleCards;
