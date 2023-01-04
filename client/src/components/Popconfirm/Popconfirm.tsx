import React, { memo } from 'react';

import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import {
  Box,
  Button,
  ButtonProps,
  IconButton,
  Popover,
  Typography,
} from '@mui/material';

import { buttonWrapper } from './styles';

type Props = ButtonProps & {
  message: string;
  confirm: VoidFunction;
};

function Popconfirm(props: Props) {
  const {
    message, confirm, onClick, children, ...otherProps
  } = props;

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Button onClick={handleClick} {...otherProps}>
        {children}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Box>
          <Typography sx={{ p: 2 }}>
            {message}
          </Typography>
          <Box sx={buttonWrapper}>
            <IconButton onClick={confirm}>
              <CheckSharpIcon fontSize="medium" />
            </IconButton>
            <IconButton onClick={handleClose}>
              <CancelSharpIcon fontSize="medium" />
            </IconButton>
          </Box>
        </Box>
      </Popover>
    </div>
  );
}

export default memo(Popconfirm);
