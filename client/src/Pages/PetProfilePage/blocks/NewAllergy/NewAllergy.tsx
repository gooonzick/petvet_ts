import React, { ChangeEvent, useCallback, useState } from 'react';

import { Button, TextField } from '@mui/material';

import { useAddNewAllergyMutation } from '@/redux/api/allergy.api';

import { addButton } from './styles';

type Props = {
  petId: number | undefined;
  onSubmit: VoidFunction;
};

function NewAllergy({ petId, onSubmit }: Props) {
  const [newAllergy, setNewAllergy] = useState('');
  const [addNewAllergy, { isLoading }] = useAddNewAllergyMutation();

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNewAllergy(e.target.value);
  }, []);

  const onSubmitNewAllergy = useCallback((name: string) => {
    if (petId && name) {
      addNewAllergy({ petId, name }).then((_) => onSubmit());
    }
  }, []);

  return (
    <>
      <TextField
        label="Введите название аллергии"
        variant="standard"
        value={newAllergy}
        onChange={onChange}
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        onClick={() => onSubmitNewAllergy(newAllergy)}
        sx={addButton}
      >
        Добавить
      </Button>
    </>
  );
}

export default NewAllergy;
