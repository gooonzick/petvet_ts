import { IconButton, TextField, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
    text: string,
    onSubmitEdit: (field: string) => (newVal: string) => Promise<void>
}

function EditableText({ text, onSubmitEdit }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(text);
  const onCahngeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const submitEditHandler = () => {
    onSubmitEdit(value);
    setIsEdit(false);
  };
  const cancelHandler = () => {
    setIsEdit(false);
  };
  return !isEdit ? (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="h5">{text}</Typography>
      <IconButton onClick={() => setIsEdit(true)}><EditIcon style={{ fontSize: 'medium' }} /></IconButton>
    </div>
  ) : (
    <TextField
      sx={{ width: 'max-content' }}
      variant="standard"
      value={value}
      onChange={(e:ChangeEvent<HTMLInputElement>) => { onCahngeHandler(e); }}
      InputProps={{
        endAdornment:
      <div style={{ display: 'flex' }}>
        <IconButton onClick={() => { submitEditHandler(); }}><DoneIcon style={{ fontSize: 'medium' }} /></IconButton>
        <IconButton onClick={() => { cancelHandler(); }}><CloseIcon style={{ fontSize: 'medium' }} /></IconButton>
      </div>,
      }}
    />
  );
}

export default EditableText;
