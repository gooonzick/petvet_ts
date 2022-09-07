import {
  Box, SxProps, Theme, Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { memo } from 'react';

type Props = {
  index: number
  text: string
  editable: boolean
  clearHandler?: () => void
}

const boxStyle: SxProps<Theme> = {
  backgroundColor: '#D9D9D9',
  width: 'max-content',
  padding: '5px',
  borderRadius: '4px',
  marginRight: '5px',
  alignItems: 'center',
  display: 'flex',
};

function WordCard({
  text, index, editable, clearHandler,
}: Props) {
  return (
    <Box
      sx={boxStyle}
      key={`${index}-${text}`}
    >
      <Typography variant="body1" sx={{ display: 'inline-block' }}>{text}</Typography>
      {editable && clearHandler && <ClearIcon sx={{ cursor: 'pointer' }} onClick={() => clearHandler()} />}
    </Box>
  );
}

export default memo(WordCard);
