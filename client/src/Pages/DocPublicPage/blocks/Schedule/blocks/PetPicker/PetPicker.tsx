import { memo, useCallback } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import { connect } from 'react-redux';
import { RootState } from '@/redux/types';
import { usersPetsSelector } from '@/redux/selectors/userSelector';
import { Pet } from '@/models/models';

type Props = {
  pets?: Pet[];
  currentPet: number | null;
  setPet: (id: number | null) => void;
};

const mapStateToProps = (state: RootState) => {
  const pets = usersPetsSelector(state);

  return {
    pets,
  };
};

function PetPicker({ pets = [], currentPet, setPet }: Props) {
  const handleChange = useCallback((event: SelectChangeEvent<number | null>) => {
    setPet(Number(event.target.value));
  }, [setPet]);

  if (pets?.length === 0) {
    return <p>У вас нет питомца</p>;
  }

  return (
    <FormControl
      fullWidth
      sx={{ marginTop: '1rem' }}
    >
      <InputLabel id="petpicker-select-label">Питомец</InputLabel>
      <Select
        labelId="petpicker-select-label"
        id="petpicker-select"
        value={currentPet}
        label="Питомец"
        onChange={handleChange}
      >
        {pets.map(({ id, name }) => <MenuItem key={`${id}-${name}`} value={id}>{name}</MenuItem>)}
      </Select>
    </FormControl>
  );
}

export default connect(mapStateToProps)(memo(PetPicker));
