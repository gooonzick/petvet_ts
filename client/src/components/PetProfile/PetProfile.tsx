import {
  Avatar, Box, Grid, SxProps, Theme, Typography, useTheme,
} from '@mui/material';
import { Pet } from '../../models/models';
import WordCard from '../WordCard/WordCard';

type Props = {
  pet: Pet
}

const parentBoxStyle: SxProps<Theme> = {
  backgroundColor: 'paper',
  minWidth: '32rem',
  width: '70%',
  maxWidth: '45rem',
  height: 'max-content',
  borderRadius: '19px',
  display: 'flex',
  flexFlow: 'column',
  padding: '1.5rem 1.5rem 3.5rem 1.5rem',
  boxShadow: 4,
  boxSizing: 'border-box',
  alignItems: 'start',
};
const gridContainerStyle: SxProps<Theme> = {
  backgroundColor: 'white',
};
const avatarBoxStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'start',
  height: 'fit-content',
  gap: 2,
};
const avatarStyle: SxProps<Theme> = {
  width: '10rem',
  height: '10rem',
  m: 2,
};
const typographyStyle: SxProps<Theme> = {
  fontWeight: 'bold',
};
const wordCardParentStyle: SxProps<Theme> = {
  display: 'flex', flexWrap: 'wrap',
};

function PetProfile({ pet }: Props) {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  return (
    <Box sx={parentBoxStyle}>
      {/* спозиционировать аватар и имя */}
      <Box sx={avatarBoxStyle}>
        <Avatar
          alt={pet.name}
          src={pet.img}
          sx={{ ...avatarStyle, border: `1px solid ${primary}` }}
          // onClick={handleOpenImgModal}
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
        <Grid item xs={5}>
          <Typography variant="h6" component="span" sx={typographyStyle}>
            Вид:
          </Typography>
          <Typography variant="h6" component="span">
            {` ${pet.specie}`}
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography variant="h6" component="span" sx={typographyStyle}>
            Порода:
          </Typography>
          <Typography variant="h6" component="span">
            {` ${pet.breed}`}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" component="span" sx={typographyStyle}>
            Пол:
          </Typography>
          <Typography variant="h6" component="span">
            {pet.sex === 1 ? ' М' : ' Ж'}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" component="span" sx={typographyStyle}>
            Вес:
          </Typography>
          <Typography variant="h6" component="span">
            {` ${pet.weight}`}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" component="span" sx={typographyStyle}>
            Окрас:
          </Typography>
          <Typography variant="h6" component="span">
            {` ${pet.color}`}
          </Typography>

        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" component="span" sx={typographyStyle}>
            {pet.sex === 1 ? 'Кастрирован:' : 'Стерелизована:'}
          </Typography>
          <Typography variant="h6" component="span">
            {pet.sterilized === true ? ' да' : ' нет'}
          </Typography>

        </Grid>
        {pet.sterilized === true ? (
          <Grid item xs={8}>
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

export default PetProfile;
