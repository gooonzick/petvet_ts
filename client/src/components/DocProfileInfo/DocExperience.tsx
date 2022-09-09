import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  SxProps,
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useCallback, useState } from 'react';

type Props = {
  text: string
}

const collapsedAccordionStyle:SxProps<Theme> = {
  backgroundColor: '#D9D9D9',
  p: 2,
  m: '.5rem',
  borderRadius: '9px',
  transition: 'all .3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.01)',
  },
  boxShadow: 3,
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

const editTextFieldStyle: SxProps<Theme> = {
  width: '100%',
  backgroundColor: 'white',
  borderRadius: '5px',
};

function DocExperience({ text }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState(text);

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const neutral = theme.palette.warning.main;

  const cancleEditHandler = useCallback(() => {
    setInput(text);
    setEdit(false);
  }, []);

  const saveEditHandler = useCallback(() => {
    // do some fetch
    setEdit(false);
  }, []);

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded((prev) => !prev)}
      sx={!expanded ? collapsedAccordionStyle : expandedAccordionStyle}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="aboutme-content"
        id="aboutme"
      >
        <Typography>О себе</Typography>
      </AccordionSummary>
      {edit
        ? (
          <>
            <AccordionDetails sx={editAccordionStyle}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                name="О себе"
                value={input}
                sx={editTextFieldStyle}
                onChange={(e) => setInput(e.target.value)}
              />
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
                onClick={() => saveEditHandler()}
                size="small"
                sx={{ ...saveEditButtonStyle, backgroundColor: primary }}
              >
                Сохранить
              </Button>
            </AccordionActions>
          </>
        ) : (
          <AccordionDetails>
            <Typography>
              {text}
            </Typography>
            <AccordionActions>
              <Button
                onClick={() => setEdit((prev) => !prev)}
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

export default DocExperience;
