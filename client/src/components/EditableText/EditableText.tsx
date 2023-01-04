import { ChangeEvent, useCallback, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, TextField, Typography } from '@mui/material';

import * as styles from './styles';

type Props = {
  text: string,
  onSubmitEdit: (newVal: string) => Promise<void>
};

function EditableText({ text, onSubmitEdit }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(text);

  const onCahngeHandler = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const submitEditHandler = useCallback(() => {
    onSubmitEdit(value);
    setIsEdit(false);
  }, [onSubmitEdit, value]);

  const cancelHandler = useCallback(() => {
    setIsEdit(false);
  }, []);

  if (isEdit) {
    const icons = (
      <div style={styles.iconContainer}>
        <IconButton onClick={submitEditHandler}><DoneIcon fontSize="medium" /></IconButton>
        <IconButton onClick={cancelHandler}><CloseIcon fontSize="medium" /></IconButton>
      </div>
    );

    return (
      <TextField
        sx={styles.textField}
        variant="standard"
        value={value}
        onChange={onCahngeHandler}
        InputProps={{ endAdornment: icons }}
      />
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="h5">{text}</Typography>
      <IconButton onClick={() => setIsEdit(true)}><EditIcon fontSize="medium" /></IconButton>
    </div>
  );
}

export default EditableText;
