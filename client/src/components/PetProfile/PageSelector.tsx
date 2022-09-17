import {
  Box, Button, SxProps, Theme,
} from '@mui/material';

const buttonsWraperStyle: SxProps<Theme> = {
  position: { xs: '', sm: '', md: 'absolute' },
  right: '10px',
  top: '15px',
  display: 'flex',
  flexDirection: { xs: 'row', sm: 'row', md: 'column' },
  justifyContent: { xs: 'center', sm: 'center' },
  width: { xs: '100%', sm: '100%', md: 'max-content' },
  gap: '3px',
  marginBottom: { xs: '0.5rem', sm: '0.5rem', md: 'column' },
};

const btnStyles: SxProps<Theme> = {
  boxShadow: 2,
  color: 'black',
  borderRadius: '6px',
  transition: 'all .3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.01)',
  },
  backgroundColor: 'white',
};

function PageSelector({ page, clickHandler }: {
  page: number, clickHandler: (pageId:number) => void }) {
  return (
    <Box sx={buttonsWraperStyle}>
      <Button
        onClick={() => clickHandler(1)}
        name="quest"
        sx={page === 1 ? { ...btnStyles, backgroundColor: '#fecd45' } : btnStyles}
        key="one"
      >
        Анкета
      </Button>
      <Button
        onClick={() => clickHandler(2)}
        name="history"
        sx={page === 2 ? { ...btnStyles, backgroundColor: '#fecd45' } : btnStyles}
        key="two"
      >
        История
      </Button>
      <Button
        onClick={() => clickHandler(3)}
        name="newVisit"
        sx={page === 3 ? { ...btnStyles, backgroundColor: '#fecd45' } : btnStyles}
        key="three"
      >
        Лист приема
      </Button>
    </Box>

  );
}

export default PageSelector;
