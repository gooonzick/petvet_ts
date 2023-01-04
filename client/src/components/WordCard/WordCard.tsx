import { memo } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import {
  Box, SxProps, Theme, Typography,
} from '@mui/material';

type Props = {
  text: string
  editable: boolean
  clearHandler?: () => void
};

const boxStyle: SxProps<Theme> = {
  backgroundColor: '#D9D9D9',
  width: 'max-content',
  padding: '5px',
  borderRadius: '4px',
  margin: '0 5px 5px 0',
  alignItems: 'center',
  display: 'flex',
};

function WordCard({
  text, editable, clearHandler,
}: Props) {
  return (
    <Box
      sx={boxStyle}
    >
      <Typography variant="body1" sx={{ display: 'inline-block' }}>{text}</Typography>
      {editable && clearHandler && <ClearIcon sx={{ cursor: 'pointer' }} onClick={() => clearHandler()} />}
    </Box>
  );
}

export default memo(WordCard);
