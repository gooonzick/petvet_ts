import React, { ChangeEvent, useCallback, useState } from 'react';
import { Dayjs } from 'dayjs';

import { Button, TextField } from '@mui/material';

import DatePicker from '@/components/DatePicker';

import { useAddNewVisitMutation } from '@/redux/api/visit.api';

import { prepareNewVisitQuery } from './helpers/prepareNewVisitQuery';
import { NewVisitData } from './types';

type Props = {
  petId: number | undefined;
  onSubmit: VoidFunction;
};

function NewVisit({ petId, onSubmit }: Props) {
  const [newVisit, setNewVisit] = useState<NewVisitData>({
    description: '',
    diagnose: '',
    treatment: '',
    visitDate: null,
  });

  const [addNewVisit, { isLoading }] = useAddNewVisitMutation();

  const onChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewVisit((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const onDateChange = useCallback((value: Dayjs | null) => {
    if (value) {
      setNewVisit((prev) => ({ ...prev, drugDate: value }));
    }
  }, []);

  const onSubmitNewVisit = useCallback(() => {
    if (petId) {
      addNewVisit(prepareNewVisitQuery(newVisit, petId));
    }
  }, [newVisit]);

  return (
    <>
      <TextField
        name="description"
        label="Что случилось?"
        variant="standard"
        type="text"
        value={newVisit.description}
        onChange={onChange}
        fullWidth
        // sx={textField}
      />
      <TextField
        name="diagnose"
        label="Какой диагноз?"
        variant="standard"
        type="text"
        value={newVisit.diagnose}
        onChange={onChange}
        fullWidth
        // sx={textField}
      />
      <TextField
        name="treatment"
        label="Лечение"
        variant="standard"
        type="text"
        value={newVisit.treatment}
        onChange={onChange}
        fullWidth
        // sx={textField}
      />
      <DatePicker
        value={newVisit.visitDate}
        onChange={onDateChange}
      />
      <Button
        type="submit"
        variant="contained"
        // sx={submitButton}
        disabled={isLoading}
        onClick={onSubmitNewVisit}
      >
        Добавить
      </Button>

    </>
  );
}

export default NewVisit;
