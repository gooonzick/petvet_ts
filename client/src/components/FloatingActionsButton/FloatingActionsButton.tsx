import AddIcon from '@mui/icons-material/Add';
import {
  ClickAwayListener,
  Fab,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  PopperPlacementType,
  SxProps,
  Theme,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useRef } from 'react';

type Props = {
  open: boolean;
  actions: { lable: string, handleClick: VoidFunction }[];
  sx: SxProps<Theme>
  handleOpen: VoidFunction;
  handleClose: VoidFunction;
};

function FloatingActionsButton({
  open, actions, handleClose, handleOpen, sx,
}: Props) {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const placementProp: PopperPlacementType = matches ? 'top-start' : 'top-end';

  return (
    <>
      <Fab
        ref={anchorRef}
        color="primary"
        aria-label="add"
        sx={sx}
        onClick={handleOpen}
        disableRipple
      >
        <AddIcon />
      </Fab>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement={placementProp}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                >
                  {actions.map(({ handleClick, lable }) => (
                    <MenuItem key={lable} onClick={handleClick}>
                      {lable}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

    </>
  );
}

export default FloatingActionsButton;
