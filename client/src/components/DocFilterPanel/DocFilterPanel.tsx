import {
  Accordion, AccordionDetails, AccordionSummary, SxProps, TextField, Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Props = {}

const textFieldStyle: SxProps = { width: '100%', mb: '0.7rem' };

function DocFilterPanel() {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="filter-content"
        id="filter-header"
      >
        <Typography>Фильтр</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField type="text" label="Кого лечим?" name="Кого лечим?" variant="outlined" sx={textFieldStyle} />
        <TextField type="text" label="Специальность врача?" name="Специальность врача?" variant="outlined" sx={textFieldStyle} />
      </AccordionDetails>
    </Accordion>
  );
}

export default DocFilterPanel;
