import { Dayjs } from 'dayjs';
import React from 'react';
import WordCard from '@/components/WordCard/WordCard';

type Props = {
  data: Dayjs[];
  deleteHandler: (index: number) => void;
};

function ScheduleSlots({ data, deleteHandler }: Props) {
  if (data.length === 0) {
    return null;
  }

  return (
    <>
      {data.map((el, index) => (
        <WordCard
          key={el.format()}
          text={el.format('dddd DD/MM/YYYY HH:mm')}
          editable
          clearHandler={() => deleteHandler(index)}
        />
      ))}
    </>
  );
}

export default ScheduleSlots;
