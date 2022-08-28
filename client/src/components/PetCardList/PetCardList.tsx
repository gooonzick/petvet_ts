import {
  Button, Box, SxProps, Theme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Pet } from '../../models/models';
import PetCard from '../PetCard/PetCard';

type Props = {
    pets: Pet[]
}

const boxParentStyle: SxProps<Theme> = {
  marginTop: '2rem',
  display: { xs: 'flex', md: 'block' },
  flexDirection: { xs: 'column' },
  alignItems: { xs: 'center' },
};

const petListBoxStyle: SxProps<Theme> = {
  marginTop: '2rem',
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  gap: '1rem',
};

function PetCardList({ pets }:Props) {
  const navigate = useNavigate();
  return (
    <Box sx={boxParentStyle}>
      <Button variant="contained" onClick={() => navigate('/newPet')}>Новый питомец</Button>
      <Box sx={petListBoxStyle}>
        {pets.length > 0 && pets.map((pet) => <PetCard key={pet.id} pet={pet} />)}
      </Box>
    </Box>
  );
}

export default PetCardList;
