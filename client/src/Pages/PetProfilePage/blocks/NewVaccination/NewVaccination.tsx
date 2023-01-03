import { Button, TextField } from '@mui/material';
import { ChangeEvent, useCallback, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Vaccinations } from '@/models/models';
import DatePicker from '@/components/DatePicker';

type Props = {
  petId: number | undefined;
};

type A = { drugName: string, drugDate: null | Dayjs, description: string };

function NewVaccination({ petId }: Props) {
  const [vac, setVac] = useState<A>({ drugName: '', drugDate: null, description: '' });
  const [focus, setFocused] = useState(false);

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
        sx={{ marginBottom: '5px' }}
      />
      <TextField
        name="drugName"
        label="Название препарата"
        variant="standard"
        type="text"
        value={vac.drugName}
        onChange={onChange}
        fullWidth
        sx={{ marginBottom: '5px' }}
      />

      <DatePicker
        value={vac.drugDate}
        onChange={onDateChange}
      />

      {/* <TextField
        name="drugDate"
        label="Когда?"
        variant="standard"
        onFocus={onFocus}
        onBlur={onBlur}
        type={focus || vac.drugDate ? 'date' : 'text'}
        value={vac.drugDate ?? ''}
        onChange={onChange}
        fullWidth
      /> */}
      <Button
        type="submit"
        variant="contained"
        sx={{ marginTop: '0.7rem', marginLeft: 'auto' }}
      >
        Добавить
      </Button>

    </>
  );
}

export default NewVaccination;
