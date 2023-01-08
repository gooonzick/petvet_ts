import { memo, useMemo } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import {
  Box, SxProps, Theme, Typography,
} from '@mui/material';

import * as styles from './styles';

type Props = {
  text: string
  editable: boolean
  clearHandler?: () => void
  sx?: SxProps<Theme>
};

function WordCard({
  text, editable, clearHandler, sx = {},
}: Props) {
  const cascadeStyle = useMemo(() => ({ ...styles.cardContainer, ...sx }), [sx]);
  return (
    <Box
      sx={cascadeStyle}
    >
      <Typography variant="body1" sx={styles.title}>{text}</Typography>
      {editable && clearHandler && <ClearIcon sx={styles.clearIcon} onClick={clearHandler} />}
    </Box>
  );
}

export default memo(WordCard);
