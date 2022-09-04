import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  categoryFilter: string
  profileFilter: string
  changeHandlers: {
    setProfileName: Dispatch<SetStateAction<string>>;
    setCategoryName: Dispatch<SetStateAction<string>>;
  }
}

const textFieldStyle: SxProps = { width: '100%', mb: '0.7rem' };

function DocFilterPanel({ categoryFilter, profileFilter, changeHandlers }:Props) {
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
        <FormControl sx={textFieldStyle}>
          <InputLabel id="category-dropdown-lable">Кого лечим?</InputLabel>
          <Select
            labelId="category-dropdown-lable"
            id="category-dropdown"
            value={categoryFilter}
            label="Кого лечим?"
            onChange={(e) => changeHandlers.setCategoryName(e.target.value)}
          >
            <MenuItem value="">
              <em>Нет</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={textFieldStyle}>
          <InputLabel id="profile-dropdown-lable">Специальность врача?</InputLabel>
          <Select
            labelId="profile-dropdown-lable"
            id="profile-dropdown"
            value={profileFilter}
            label="Специальность врача?"
            onChange={(e) => changeHandlers.setProfileName(e.target.value)}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
}

export default DocFilterPanel;
