import {
  Box, Button, Fab, Grow, Modal, SxProps, Theme, Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useCallback, useState } from 'react';
import { Pet } from '../../models/models';
import NewPetInfo from '../NewPetInfo/NewPetInfo';

const parentBoxStyle: SxProps<Theme> = {
  width: { xs: '100%', sm: '100%', md: '70%' },
  maxWidth: { xs: '100%', sm: '100%', md: '40rem' },
  height: 'max-content',
  display: 'flex',
  flexFlow: 'column',
  padding: '1.5rem 1.5rem 3.5rem 1.5rem',
  boxSizing: 'border-box',
  alignItems: { xs: 'center', sm: 'center', md: 'start' },
};

const floatinButtonStyle: SxProps<Theme> = {
  position: { xs: 'fixed', sm: 'fixed', md: 'static' },
  bottom: { xs: '1rem', sm: '1rem', md: 0 },
  right: { xs: '1rem', sm: '1rem', md: 0 },
  margin: { md: 'auto' },
};

const styleCards: SxProps<Theme> = {
  backgroundColor: '#d9d9d9',
  width: '100%',
  height: 'max-content',
  borderRadius: '19px',
  marginBottom: '1rem',
  display: 'flex',
  flexFlow: 'column',
  padding: '1rem 1.5rem 1rem 1.5rem',
  boxShadow: 3,
};

export default function HistoryVisits({ pet }: {pet: Pet}) {
  const [modal, setModal] = useState(false);

  const closeModalHandler = useCallback(() => {
    setModal(false);
  }, []);

  const openModalHandler = useCallback(() => {
    setModal(true);
  }, []);
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
      <Fab
        color="primary"
        aria-label="add"
        sx={floatinButtonStyle}
        onClick={() => openModalHandler()}
        disableRipple
      >
        <AddIcon />
      </Fab>
      <NewPetInfo open={modal} closeHandler={closeModalHandler} />
    </Box>
  );
}
