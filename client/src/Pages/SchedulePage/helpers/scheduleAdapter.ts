import { Dayjs } from 'dayjs';

export default function shceduleAdapter(days: Dayjs[]) {
  return days.map((day) => ({
    dateOfReceipt: day.toDate(),
  }));
}
