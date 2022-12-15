import { useCallback, useState } from 'react';

import {
  Backdrop, Box, Button, Fade, Modal,
} from '@mui/material';

import dayjs, { Dayjs } from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllSchedulesQuery } from '@/redux/api/schedules.api';

import DialogModal from '@/components/DialogModal';
import Calendar from '@/components/Calendar/Calendar';
import NewDateSlotModal from '@/components/NewDateSlotModal';
import ScheduleCards from './blocks/ScheduleCards';

import { dateSlotButtonStyle, mainBox } from './styles';
import { RootState } from '@/redux/types';
import { closeDialog } from '@/redux/slices/dialogSlice';

function SchedulePage() {
  const [day, setDay] = useState<Dayjs>(dayjs());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isDialogOpen = useSelector((state: RootState) => state.dialog.isOpen);
  const dispatch = useDispatch();

  const { data } = useGetAllSchedulesQuery(day.format('YYYY-MM-DD'));

  const openModalHandler = useCallback(() => {
    setIsModalOpen(true);
  }, [setIsModalOpen]);

  const closeModalHandler = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const onResult = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <Box sx={mainBox}>
      <Box sx={dateSlotButtonStyle}>
        <Calendar
          selectedDate={day}
          setSelectedDate={setDay}
          busyDays={data}
        />
        <Button variant="contained" onClick={openModalHandler}>Добавить слот</Button>
      </Box>
      <ScheduleCards data={data} day={day} />
      <Modal
        open={isDialogOpen}
        onClose={() => dispatch(closeDialog())}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isDialogOpen}>
          <div>
            <DialogModal />
          </div>
        </Fade>
      </Modal>
      <Modal
        open={isModalOpen}
        onClose={closeModalHandler}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isModalOpen}>
          <div>
            <NewDateSlotModal onResult={onResult} />
          </div>
        </Fade>
      </Modal>
    </Box>
  );
}

export default SchedulePage;
