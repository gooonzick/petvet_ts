import { Dayjs } from 'dayjs';

export type NewVisitData = {
  docId?: number;
  userId?: number;
  visitDate: Dayjs | null;
  description: string;
  diagnose: string;
  treatment: string;
};
