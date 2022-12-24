import {
  Avatar, Box, Grid, Typography, useTheme,
} from '@mui/material';
import { memo } from 'react';
import { Pet } from '@/models/models';
import WordCard from '@/components/WordCard/WordCard';
import {
  parentBoxStyle,
  avatarBoxStyle,
  avatarStyle,
  gridContainerStyle,
  typographyStyle,
  wordCardParentStyle,
} from './styles';

type Props = {
  pet: Pet
};

function PetProfile({ pet }: Props) {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  return (
    <Box sx={parentBoxStyle}>
      <Box sx={avatarBoxStyle}>
        <Avatar
          alt={pet.name}
          src={pet.img}
          sx={{ ...avatarStyle, border: `1px solid ${primary}` }}
        />
        <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', alignSelf: 'center' }}>
          Имя:
          {` ${pet.name}`}
        </Typography>
      </Box>

      <Grid
        sx={gridContainerStyle}
        container
        spacing={3}
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography variant="h6" component="span" sx={typographyStyle}>
            Дата рождения:
          </Typography>
          {pet.birthday && (
            <Typography variant="h6" component="span">
              {` ${new Date(pet.birthday).toLocaleDateString()}`}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={5} md={5}>
          <Typography variant="h6" component="span" sx={typographyStyle}>
            Вид:
          </Typography>
          <Typography variant="h6" component="span">
            {` ${pet.specie}`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={7} md={7}>
          <Typography variant="h6" component="span" sx={typographyStyle}>
            Порода:
          </Typography>
          <Typography variant="h6" component="span">
            {` ${pet.breed}`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <Typography variant="h6" component="span" sx={typographyStyle}>
            Пол:
          </Typography>
          <Typography variant="h6" component="span">
            {pet.sex === 1 ? ' М' : ' Ж'}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <Typography variant="h6" component="span" sx={typographyStyle}>
            Вес:
          </Typography>
          <Typography variant="h6" component="span">
            {` ${pet.weight}`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Typography variant="h6" component="span" sx={typographyStyle}>
            Окрас:
          </Typography>
          <Typography variant="h6" component="span">
            {` ${pet.color}`}
          </Typography>

        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" component="span" sx={typographyStyle}>
            {pet.sex === 1 ? 'Кастрирован:' : 'Стерелизована:'}
          </Typography>
          <Typography variant="h6" component="span">
            {pet.sterilized === true ? ' Да' : ' Нет'}
          </Typography>

        </Grid>
        {pet.sterilized === true ? (
          <Grid item xs={12} sm={6} md={8}>
            <Typography
              variant="h6"
              component="span"
              sx={typographyStyle}
            >
              Дата:
            </Typography>
            {pet.sterilizedDate && (
              <Typography
                variant="h6"
                component="span"
              >
                {` ${new Date(pet.sterilizedDate).toLocaleDateString()}`}
              </Typography>
            )}

          </Grid>
        ) : null}
        <Grid item xs={12}>
          <Typography variant="h6" component="span" sx={typographyStyle}>
            Хронические болезни:
            {pet.chronicDiseases.length > 0 && (
              <Box sx={wordCardParentStyle}>
                {pet.chronicDiseases.map((el) => (
                  <WordCard editable={false} key={el.id} text={el.name} />
                ))}
              </Box>
            )}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="span" sx={typographyStyle}>
            Аллергии:
            {pet.allergies.length > 0 && (
              <Box sx={wordCardParentStyle}>
                {pet.allergies.map((el) => (
                  <WordCard editable={false} key={el.id} text={el.name} />
                ))}
              </Box>
            )}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default memo(PetProfile);
