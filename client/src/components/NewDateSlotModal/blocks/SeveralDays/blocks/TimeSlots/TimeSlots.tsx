import { Dayjs } from 'dayjs';
import WordCard from '@/components/WordCard/WordCard';

type Props = {
    data: Dayjs[];
    deleteHandler: (index: number) => void;
}

function TimeSlots({ data, deleteHandler }: Props) {
  if (data.length === 0) {
    return null;
  }

  return (
    <>
      {data.map((day, index) => (
        <WordCard
          key={day.format()}
          text={`${day.format('hh:mm A')}`}
          clearHandler={() => deleteHandler(index)}
          editable
        />
      ))}
    </>
  );
}

export default TimeSlots;
