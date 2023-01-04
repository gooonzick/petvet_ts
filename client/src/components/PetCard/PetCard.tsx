import { useMemo } from 'react';

import {
  Avatar, Card, CardActionArea, Typography, useMediaQuery, useTheme,
} from '@mui/material';

import { Pet } from '@/models/models';

import { avatar, innerCardContainer, outterCardContainer } from './styles';

type Props = {
  pet: Pet;
  onCardClick: VoidFunction;
};

function PetCard({ pet, onCardClick }: Props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const nameVariant = useMemo(() => {
    if (matches) {
      return 'h4';
    }
    return 'h6';
  }, [matches]);

  return (
    <Card sx={outterCardContainer}>
      <CardActionArea onClick={onCardClick} sx={innerCardContainer}>
        <Avatar src={pet.img} sx={avatar} />
        <Typography variant={nameVariant} component="p">{pet.name}</Typography>
      </CardActionArea>
    </Card>
  );
}

export default PetCard;
