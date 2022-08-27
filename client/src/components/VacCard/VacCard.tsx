import { Box, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Vaccinations } from '../../models/models';

type Props = {
  vacData: Vaccinations
  deleteCardHandler: () => void
}

function VacCard({ vacData, deleteCardHandler }: Props) {
  return (
    <Box sx={{
      height: 'max-content',
      padding: '0.7rem',
      width: '80%',
      margin: 'auto',
      borderRadius: '10px',
      boxShadow: '5px 5px 8px rgba(0, 0, 0, 0.2)',
      position: 'relative',
      backgroundColor: '#D9D9D9',
    }}
    >
      <ClearIcon sx={{ cursor: 'pointer', position: 'absolute', right: '1rem' }} onClick={() => deleteCardHandler()} />
      <Typography variant="subtitle1">{vacData.description}</Typography>
      <Typography variant="subtitle2">{vacData.drugName}</Typography>
      <Typography variant="body1">{vacData.drugDate && vacData.drugDate.toLocaleDateString()}</Typography>
    </Box>
  );
}

export default VacCard;
