import { ChangeEvent, useCallback, useState } from 'react';
import { Dayjs } from 'dayjs';

import { Button, TextField } from '@mui/material';

import DatePicker from '@/components/DatePicker';

import { submitButton, textField } from './styles';

import { NewVac } from './types';

type Props = {
  petId: number | undefined;
};

function NewVaccination({ petId }: Props) {
  const [vac, setVac] = useState<NewVac>({ drugName: '', drugDate: null, description: '' });

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
      >
        Добавить
      </Button>

    </>
  );
}

export default NewVaccination;
