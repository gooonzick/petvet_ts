import dayjs, { Dayjs } from 'dayjs';

export default function getSlots(start: Dayjs, end: Dayjs, daysOfWeek: number[]) {
  const result = [];
  let current = start.clone();

  if (daysOfWeek.length === 0) return [];

  while (current.isBefore(end)) {
    const day = current.day();
    if (daysOfWeek.includes(day)) {
      result.push(current.clone());
    }
    current = current.add(1, 'day');
  }
  return result;
}
