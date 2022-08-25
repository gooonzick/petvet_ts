import {
  Avatar, Card, CardActionArea, Typography,
} from '@mui/material';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pet } from '../../models/models';

type Props = {
    pet: Pet
}

function PetCard({ pet }: Props) {
  const navigate = useNavigate();
  const avatarPicker = useRef<HTMLInputElement>(null);
  const cardOnClick = () => {
    navigate(`pets/${pet.id}`);
  };

  return (
    <Card sx={{ width: 'max-content', textAlign: 'center' }}>
      <CardActionArea onClick={() => cardOnClick()} sx={{ padding: '1rem' }}>
        <Avatar src={pet.img} onClick={() => avatarPicker.current?.click()} sx={{ width: '7rem', height: '7rem', marginBottom: '1rem' }}>
          <input type="file" hidden ref={avatarPicker} />
        </Avatar>
        <Typography variant="h6" component="p">{pet.name}</Typography>
      </CardActionArea>
    </Card>
  );
}

export default PetCard;
