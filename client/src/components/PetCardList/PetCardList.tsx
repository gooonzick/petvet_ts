import { Box, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useCallback } from 'react';
import { Pet } from '@/models/models';
import PetCard from '@/components/PetCard';
import { addPetButton, boxParentStyle, petListBoxStyle } from './styles';

type Props = {
  pets: Pet[];
};

function PetCardList({ pets }: Props) {
  const navigate = useNavigate();

  const onCardClick = useCallback((id: number | undefined) => {
    if (id) {
      navigate(`/pets/${id}`);
    }
  }, [navigate]);

  const onAddNew = useCallback(() => navigate('/pets/new'), []);

  return (
    <Box sx={boxParentStyle}>
      <Typography variant="h4">Ваши питомцы</Typography>
      <Box sx={petListBoxStyle}>
        {pets.length > 0 && pets.map((pet) => (
          <PetCard
            key={pet.id}
            pet={pet}
            onCardClick={() => onCardClick(pet.id)}
          />
        ))}
        <IconButton sx={addPetButton} onClick={onAddNew}>
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default PetCardList;
