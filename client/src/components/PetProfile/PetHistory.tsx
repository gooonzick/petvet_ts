import {
  Box, SxProps, Theme, Typography,
} from '@mui/material';
import { Pet } from '../../models/models';

const parentBoxStyle: SxProps<Theme> = {
  width: { xs: '100%', sm: '100%', md: '70%' },
  maxWidth: '40rem',
  height: 'max-content',
  display: 'flex',
  flexFlow: 'column',
  padding: '1.5rem 1.5rem 3.5rem 1.5rem',
  boxSizing: 'border-box',
  alignItems: { xs: 'center', sm: 'center', md: 'start' },
};

const styleCards: SxProps<Theme> = {
  backgroundColor: '#d9d9d9',
  width: { xs: '100%', sm: '100%', md: '70%' },
  height: 'max-content',
  borderRadius: '19px',
  marginBottom: '1rem',
  display: 'flex',
  flexFlow: 'column',
  padding: '1rem 1.5rem 1rem 1.5rem',
  boxShadow: 3,
};

export default function HistoryVisits({ pet }: {pet: Pet}) {
  return (
    <Box sx={parentBoxStyle}>
      <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', py: 1 }}>
        Вакцинация / Обработка:
      </Typography>
      {pet.vaccinations.map((el) => (
        <Box className="container" key={el.id} sx={styleCards}>
          <Typography
            variant="body1"
            component="span"
          >
            <b>Препарат:</b>
            {` ${el.drugName}`}
          </Typography>
          <Typography
            variant="body1"
            component="span"
          >
            <b> Дата обработки: </b>
            {` ${new Date(el.drugDate!).toLocaleDateString()}`}
          </Typography>
        </Box>
      ))}

      <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', py: 1 }}>
        История визитов:
      </Typography>
      {pet.visits && pet.visits.map((el) => (
        <Box className="container" key={el.id} sx={styleCards}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              // mx: '1rem',
            }}
          >
            <Typography
              variant="body1"
              component="span"
            >
              <b> Дата визита: </b>
              {` ${new Date(el.visitDate).toLocaleDateString()}`}
            </Typography>

            <Typography
              variant="body1"
              component="span"
            >
              <b>  Диагноз:</b>
              {` ${el.diagnose}`}
            </Typography>
            <Typography
              variant="body1"
              component="span"
            >
              <b>  Лечение:</b>
              {` ${el.treatment}`}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
