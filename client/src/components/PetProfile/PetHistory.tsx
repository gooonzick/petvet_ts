import { Box, Typography } from '@mui/material';
import { Pet } from '../../models/models';

export default function HistoryVisits({ pet }: {pet: Pet}) {
  const styleCards = {
    backgroundColor: '#d9d9d9',
    minWidth: '32rem',
    width: '40rem',
    borderRadius: '19px',
    marginBottom: '1rem',
    display: 'flex',
    flexFlow: 'column',
    padding: '1rem 1.5rem 1rem 1.5rem',
    boxShadow: 3,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', py: 1 }}>
        Вакцинация / Обработка:
      </Typography>
      {pet.vaccinations.map((el) => (
        <Box className="container" key={el.id} sx={styleCards}>
          <Typography
            variant="h6"
            component="span"
          >
            <b>Препарат:</b>
            {` ${el.drugName}`}
          </Typography>
          <Typography
            variant="h6"
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
      {pet.Visits.map((el) => (
        <Box className="container" key={el.id} sx={styleCards}>
          <Typography
            variant="h6"
            component="div"
            // sx={{ fontWeight: 'bold' }}
          >
            <b> Врач: </b>
            {` ${el.doctor.first_name} ${el.doctor.last_name}`}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              // mx: '1rem',
            }}
          >
            <Typography
              variant="p"
              component="span"
              // sx={{ fontWeight: 'bold' }}
            >
              <b> Дата визита: </b>
              {` ${new Date(el.visit_date).toLocaleDateString()}`}
            </Typography>

            <Typography
              variant="p"
              component="span"
              // sx={{ fontWeight: 'bold' }}
            >
              <b>  Диагноз:</b>
              {` ${el.diagnose}`}
            </Typography>
          </Box>
        </Box>
      ))}
    </div>
  );
}
