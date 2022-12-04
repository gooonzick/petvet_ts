import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Dispatch, SetStateAction } from 'react';
import { useGetAllCategoriesQuery } from '../../redux/api/category.api';
import { useGetAllProfilesQuery } from '../../redux/api/profile.api';

type Props = {
  categoryFilter: string
  profileFilter: string
  changeHandlers: {
    setProfileId: Dispatch<SetStateAction<string>>;
    setCategoryId: Dispatch<SetStateAction<string>>;
  }
};

const textFieldStyle: SxProps<Theme> = { width: '100%', mb: '0.7rem' };

function DocFilterPanel({ categoryFilter, profileFilter, changeHandlers }:Props) {
  const { data: categories } = useGetAllCategoriesQuery();
  const { data: profiles } = useGetAllProfilesQuery();

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
          <InputLabel id="category-dropdown-lable">Специальность врача?</InputLabel>
          <Select
            labelId="category-dropdown-lable"
            id="category-dropdown"
            value={categoryFilter}
            label="Специальность врача?"
            onChange={(e) => changeHandlers.setCategoryId(e.target.value)}
          >
            <MenuItem value="">Нет</MenuItem>
            {categories && categories.map((category) => (
              <MenuItem key={`${category.id}-${category.name}`} value={category.id}>{category.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={textFieldStyle}>
          <InputLabel id="profile-dropdown-lable">Кого лечим?</InputLabel>
          <Select
            labelId="profile-dropdown-lable"
            id="profile-dropdown"
            value={profileFilter}
            label="Специальность врача?"
            onChange={(e) => changeHandlers.setProfileId(e.target.value)}
          >
            <MenuItem value="">Нет</MenuItem>
            {profiles && profiles.map((profile) => (
              <MenuItem key={`${profile.id}-${profile.name}`} value={profile.id}>{profile.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
}

export default DocFilterPanel;
