import { CSSProperties, Dispatch, SetStateAction } from 'react';
import { Dayjs } from 'dayjs';

import { Scheules } from '@/models/models';

export type MenuAction = 'clear' | 'cancel' | 'accept' | 'today';

export type Props = {
  selectedDate: Dayjs,
  setSelectedDate: Dispatch<SetStateAction<Dayjs>>,
  busyDays?: Scheules[],
};

export type DayDots = {
  dayWithDotContainer: CSSProperties,
  dayWithDot: CSSProperties,
};
