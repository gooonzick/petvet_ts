import dayjs, { Dayjs } from 'dayjs';

const getDateWithTime = (timeSlots: Dayjs[], date: Dayjs) => timeSlots
  .map((timeSlot) => date.clone().set('hours', timeSlot.hour()).set('minutes', timeSlot.minute()));

export default function getSlots(start: Dayjs, end: Dayjs, daysOfWeek: number[], timeSlots: Dayjs[]) {
  const result: Dayjs[] = [];
  let current = start.clone();

  if (daysOfWeek.length === 0) return [];

  while (current.isBefore(end)) {
    const day = current.day();
    if (daysOfWeek.includes(day)) {
      result.push(...getDateWithTime(timeSlots, current.clone()));
    }
    current = current.add(1, 'day');
  }
  return result;
}
