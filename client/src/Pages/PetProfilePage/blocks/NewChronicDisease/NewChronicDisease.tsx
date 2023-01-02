import { Button, TextField } from '@mui/material';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useAddNewDiseaseMutation } from '@/redux/api/disease.api';
import { addButton } from './styles';

type Props = {
  petId: number | undefined;
};

function NewChronicDisease({ petId }: Props) {
  const [newChronicDisease, setChronicDisease] = useState('');
  const [addnewDisease, { isLoading }] = useAddNewDiseaseMutation();

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setChronicDisease(e.target.value);
  }, []);

  const onSubmitNewAllergy = useCallback((name: string) => {
    if (petId && name) {
      addnewDisease({ petId, name });
    }
  }, []);

  return (
    <>
      <TextField
        label="Введите название болезни"
        variant="standard"
        value={newChronicDisease}
        onChange={onChange}
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        onClick={() => onSubmitNewAllergy(newChronicDisease)}
        sx={addButton}
      >
        Добавить
      </Button>
    </>
  );
}

export default NewChronicDisease;
