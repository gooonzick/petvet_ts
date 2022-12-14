import { memo, useCallback, useMemo } from 'react';
import { connect } from 'react-redux';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
  Theme,
} from '@mui/material';

import { Pet } from '@/models/models';

import { RootState } from '@/redux/types';

import { petPickerWrapper } from './styles';

import { usersPetsSelector } from '@/redux/selectors/userSelector';

type Props = {
  pets?: Pet[];
  currentPet: number | null;
  setPet: (id: number | null) => void;
  styles?: SxProps<Theme>;
};

const mapStateToProps = (state: RootState) => {
  const pets = usersPetsSelector(state);

  return {
    pets,
  };
};

function PetPicker({
  pets = [],
  currentPet,
  setPet,
  styles = petPickerWrapper,
}: Props) {
  const handleChange = useCallback((event: SelectChangeEvent<number | null>) => {
    setPet(Number(event.target.value));
  }, [setPet]);

  const selectOptions = useMemo(() => pets.map(({ id, name }) => <MenuItem key={`${id}-${name}`} value={id}>{name}</MenuItem>), [pets]);

  if (pets?.length === 0) {
    return <p>У вас нет питомца</p>;
  }

  return (
    <FormControl
      fullWidth
      sx={styles}
      variant="standard"
    >
      <InputLabel id="petpicker-select-label">Питомец</InputLabel>
      <Select
        labelId="petpicker-select-label"
        id="petpicker-select"
        value={currentPet}
        label="Питомец"
        onChange={handleChange}
      >
        {selectOptions}
      </Select>
    </FormControl>
  );
}

export default connect(mapStateToProps)(memo(PetPicker));
