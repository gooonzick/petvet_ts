import { IconButton, TextField, Typography } from '@mui/material';
import { ChangeEvent, useCallback, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

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
      <div style={{ display: 'flex' }}>
        <IconButton onClick={submitEditHandler}><DoneIcon style={{ fontSize: 'medium' }} /></IconButton>
        <IconButton onClick={cancelHandler}><CloseIcon style={{ fontSize: 'medium' }} /></IconButton>
      </div>
    );

    return (
      <TextField
        sx={{ width: 'max-content' }}
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
      <IconButton onClick={() => setIsEdit(true)}><EditIcon style={{ fontSize: 'medium' }} /></IconButton>
    </div>
  );
}

export default EditableText;
