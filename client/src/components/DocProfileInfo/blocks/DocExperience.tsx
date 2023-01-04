import { memo, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

import { useUpdateDocInfoMutation } from '@/redux/api/doc.api';

import {
  cancelButtonStyle,
  collapsedAccordionStyle,
  editAccordionStyle,
  editButtonStyle,
  editTextFieldStyle,
  expandedAccordionStyle,
  saveEditButtonStyle,
} from '../styles';
import { updateUser } from '@/redux/slices/userSlice';

type Props = {
  text: string
};

function DocExperience({ text }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState(text);

  const dispatch = useDispatch();

  const [updateExperience] = useUpdateDocInfoMutation();

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const neutral = theme.palette.warning.main;

  const cancleEditHandler = useCallback(() => {
    setInput(text);
    setEdit(false);
  }, [text]);

  const saveEditHandler = useCallback(async (newExp: string) => {
    // do some fetch
    const result = await updateExperience({ experience: newExp }).unwrap();
    dispatch(updateUser(result));
    setEdit(false);
  }, [dispatch, updateExperience]);

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
            <Typography>
              {text}
            </Typography>
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

export default memo(DocExperience);
