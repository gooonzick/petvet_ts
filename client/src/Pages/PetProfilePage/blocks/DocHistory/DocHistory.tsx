import React from 'react';

import { Box, Typography } from '@mui/material';

import { Visit } from '@/models/models';

import { styleCards } from '../PetHistory/styles';

type Props = {
  visits: Visit[] | undefined;
};

function DocHistory({ visits }: Props) {
  return (
    <>
      <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', py: 1 }}>
        История визитов:
      </Typography>
      {visits?.length === 0 && <Typography variant="h5">Нет данных</Typography>}
      {visits?.map((visit) => (
        <Box className="container" key={visit.id} sx={styleCards}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              variant="body1"
              component="span"
            >
              <b> Дата визита: </b>
              {` ${new Date(visit.visitDate).toLocaleDateString()}`}
            </Typography>

            <Typography
              variant="body1"
              component="span"
            >
              <b>  Диагноз:</b>
              {` ${visit.diagnose}`}
            </Typography>
            <Typography
              variant="body1"
              component="span"
            >
              <b>  Лечение:</b>
              {` ${visit.treatment}`}
            </Typography>
          </Box>
        </Box>
      ))}
    </>
  );
}

export default DocHistory;
