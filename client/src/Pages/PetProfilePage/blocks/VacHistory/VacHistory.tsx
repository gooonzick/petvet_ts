import { Box, Typography } from '@mui/material';

import { Vaccinations } from '@/models/models';

import { styleCards } from '../PetHistory/styles';

type Props = {
  vaccinations: Vaccinations[]
};

function VacHistory({ vaccinations }: Props) {
  return (
    <>
      <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', py: 1 }}>
        Вакцинация / Обработка:
      </Typography>
      {vaccinations.length === 0 && <Typography variant="h5">Нет данных</Typography>}
      {vaccinations.map((vaccination) => (
        <Box className="container" key={vaccination.id} sx={styleCards}>
          <Typography
            variant="body1"
            component="span"
          >
            <b>Препарат:</b>
            {` ${vaccination.drugName}`}
          </Typography>
          <Typography
            variant="body1"
            component="span"
          >
            <b> Дата обработки: </b>
            {` ${new Date(vaccination.drugDate!).toLocaleDateString()}`}
          </Typography>
        </Box>
      ))}
    </>
  );
}

export default VacHistory;
