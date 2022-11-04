import { Dayjs } from 'dayjs';
import { CSSProperties, Dispatch, SetStateAction } from 'react';

export type MenuAction = 'clear' | 'cancel' | 'accept' | 'today';

export type Props = {
    date: Dayjs,
    setDate: Dispatch<SetStateAction<Dayjs>>,
    busyDays: Array<{date_of_receipt: Dayjs}>,
  };

export type DayDots = {
    dayWithDotContainer: CSSProperties,
    dayWithDot: CSSProperties,
  }
