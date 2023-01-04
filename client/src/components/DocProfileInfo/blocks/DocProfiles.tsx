import { memo, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';

import WordCard from '@/components/WordCard/WordCard';

import { useDeleteDocInfoMutation, useUpdateDocInfoMutation } from '@/redux/api/doc.api';
import { useGetAllProfilesQuery } from '@/redux/api/profile.api';

import { Profile } from '@/models/models';

import { updateUser } from '@/redux/slices/userSlice';

type Props = {
  profiles: Profile[]
};

const collapsedAccordionStyle:SxProps<Theme> = {
  backgroundColor: '#D9D9D9',
  padding: 2,
  borderRadius: '9px',
  marginBottom: '0.5rem',
  transition: 'all .3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.01)',
  },
  boxShadow: 3,
  boxSizing: 'border-box',
};

const expandedAccordionStyle: SxProps<Theme> = {
  backgroundColor: 'white',
  p: 2,
  m: '.5rem',
  borderRadius: '9px',
  border: '.5px solid #FFD35A',
};

const saveEditButtonStyle: SxProps<Theme> = {
  color: 'black',
  borderRadius: '9px',
  p: '0.5rem',
  ml: 2,
};

const editButtonStyle: SxProps<Theme> = {
  color: 'black',
  borderRadius: '9px',
  p: '0.5rem',
};

const cancelButtonStyle: SxProps<Theme> = {
  color: 'black',
  borderRadius: '9px',
  p: '0.5rem',
  ml: 2,
};

const editAccordionStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  pt: 2,
};

const formControlStyle: SxProps<Theme> = { m: 1, minWidth: 120, width: '20rem' };

function DocProfiles({ profiles }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState('');

  const dispatch = useDispatch();

  const { data: allProfiles } = useGetAllProfilesQuery();
  const [updateProfile] = useUpdateDocInfoMutation();
  const [deleteProfile] = useDeleteDocInfoMutation();

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const neutral = theme.palette.warning.main;

  const cancleEditHandler = useCallback(() => {
    setEdit(false);
  }, []);

  const saveEditHandler = useCallback(async (id: string) => {
    // do some fetch
    if (!id) return;
    setInput('');
    const result = await updateProfile({ profileId: id }).unwrap();
    dispatch(updateUser(result));
    setEdit(false);
  }, []);

  const deleteProfileHandler = useCallback(async (id: number) => {
    // delete category
    if (!id) return;
    const result = await deleteProfile({ profileId: id }).unwrap();
    dispatch(updateUser(result));
  }, []);

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded((prev) => !prev)}
      sx={!expanded ? collapsedAccordionStyle : expandedAccordionStyle}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="profiles-content"
        id="profiles"
      >
        <Typography>Кого лечу?</Typography>
      </AccordionSummary>
      {edit
        ? (
          <>
            <AccordionDetails sx={editAccordionStyle}>
              <FormControl sx={formControlStyle}>
                <Select
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {allProfiles?.filter((ap) => profiles
                    .filter((p) => p.profile.id === ap.id).length === 0)
                    .map((el) => (
                      <MenuItem key={el.id} value={el.id}>
                        {el.name}
                      </MenuItem>
                    )) }
                  <MenuItem value="">
                    <em>Выбрать</em>
                  </MenuItem>
                </Select>
              </FormControl>
            </AccordionDetails>
            <AccordionActions>
              <Button
                onClick={() => cancleEditHandler()}
                size="small"
                sx={{ ...cancelButtonStyle, backgroundColor: neutral }}
              >
                Отмена
              </Button>
              <Button
                onClick={() => saveEditHandler(input)}
                size="small"
                sx={{ ...saveEditButtonStyle, backgroundColor: primary }}
              >
                Сохранить
              </Button>
            </AccordionActions>
          </>
        ) : (
          <AccordionDetails>
            {profiles.length > 0
              ? (
                <Box sx={{ display: 'flex' }}>
                  {profiles.map(({ profile }) => (
                    <WordCard
                      key={`${profile.id}-${profile.name}`}
                      editable
                      text={profile.name}
                      clearHandler={() => deleteProfileHandler(profile.id)}
                    />
                  ))}
                </Box>
              )
              : 'Информация отсутствует'}
            <AccordionActions>
              <Button
                onClick={() => setEdit(true)}
                size="small"
                sx={{ ...editButtonStyle, backgroundColor: primary }}
              >
                Редактировать
              </Button>
            </AccordionActions>
          </AccordionDetails>
        )}
    </Accordion>
  );
}

export default memo(DocProfiles);
