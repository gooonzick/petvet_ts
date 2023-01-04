import { ChangeEvent, useCallback, useState } from 'react';
import { Dayjs } from 'dayjs';

import { Button, TextField } from '@mui/material';

import DatePicker from '@/components/DatePicker';

import { useCreateNewVacMutation } from '@/redux/api/vaccination.api';

import { submitButton, textField } from './styles';

import { prepareNewVacQuery } from './helpers/prepareNewVacQuery';
import { NewVac } from './types';

type Props = {
  petId: number | undefined;
  onSubmit: VoidFunction;
};

function NewVaccination({ petId, onSubmit }: Props) {
  const [vac, setVac] = useState<NewVac>({ drugName: '', drugDate: null, description: '' });
  const [createNewVac, { isLoading }] = useCreateNewVacMutation();

  const onChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVac((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const onDateChange = useCallback((value: Dayjs | null) => {
    if (value) {
      setVac((prev) => ({ ...prev, drugDate: value }));
    }
  }, []);

  const onSubmitNewVac = useCallback(() => {
    if (petId) {
      createNewVac(prepareNewVacQuery(vac, petId)).then((_) => onSubmit());
    }
  }, [petId, vac]);

  return (
    <>
      <TextField
        name="description"
        label="Что давали/кололи?"
        variant="standard"
        type="text"
        value={vac.description}
        onChange={onChange}
        fullWidth
        sx={textField}
      />
      <TextField
        name="drugName"
        label="Название препарата"
        variant="standard"
        type="text"
        value={vac.drugName}
        onChange={onChange}
        fullWidth
        sx={textField}
      />
      <DatePicker
        value={vac.drugDate}
        onChange={onDateChange}
      />
      <Button
        type="submit"
        variant="contained"
        sx={submitButton}
        disabled={isLoading}
        onClick={onSubmitNewVac}
      >
        Добавить
      </Button>

    </>
  );
}

export default NewVaccination;
