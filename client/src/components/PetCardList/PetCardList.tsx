import {
  Button, Box, SxProps, Theme, IconButton, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Pet } from '../../models/models';
import PetCard from '../PetCard/PetCard';
import { addPetButton, boxParentStyle, petListBoxStyle } from './styles';

type Props = {
  pets: Pet[]
};

function PetCardList({ pets }:Props) {
  const navigate = useNavigate();
  return (
    <Box sx={boxParentStyle}>
      <Typography variant="h4">Ваши питомцы</Typography>
      <Box sx={petListBoxStyle}>
        {pets.length > 0 && pets.map((pet) => <PetCard key={pet.id} pet={pet} />)}
        <IconButton sx={addPetButton} onClick={() => navigate('/pets/new')}>
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default PetCardList;
