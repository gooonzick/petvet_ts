import { Pets } from '@mui/icons-material';
import { Button, Box } from '@mui/material';
import { Pet } from '../../models/models';
import PetCard from '../PetCard/PetCard';

type Props = {
    pets: Pet[]
}

function PetCardList({ pets }:Props) {
  return (
    <Box sx={{ marginTop: '2rem' }}>
      <Button variant="contained">Новый питомец</Button>
      <Box sx={{ marginTop: '2rem' }}>
        {pets.length > 0 && pets.map((pet) => <PetCard pet={pet} />)}
      </Box>
    </Box>
  );
}

export default PetCardList;
