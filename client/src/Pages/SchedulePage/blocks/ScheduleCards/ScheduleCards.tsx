import dayjs, { Dayjs } from 'dayjs';
import { useMemo } from 'react';

import { Scheules } from '@/models/models';
import ScheduleCard from '@/components/ScheduleCard';

type Props = {
  data: Scheules[] | undefined;
  day: Dayjs;
};

function ScheduleCards({ data, day }: Props) {
  const fiteredDays = useMemo(() => {
    if (data) {
      return data.filter((el) => {
        const diff = Math.abs(dayjs(el.dateOfReceipt).diff(day, 'hours'));
        const diffDays = Math.floor(diff / 24);

        return diffDays === 0;
      });
    }

    return null;
  }, [data, day]);

  return (
    <div>
      {fiteredDays ? fiteredDays.map((scheduleItem) => (
        <ScheduleCard
          key={scheduleItem.dateOfReceipt}
          schudleItem={scheduleItem}
        />
      )) : null}
    </div>
  );
}

export default ScheduleCards;
