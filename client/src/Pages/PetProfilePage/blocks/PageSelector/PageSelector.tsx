import {
  Box, Button,
} from '@mui/material';
import { btnStyles, buttonsWraperStyle } from './styles';

type Props = {
  page: number;
  clickHandler: (pageId:number) => void
};

function PageSelector({ page, clickHandler }: Props) {
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
    </Box>
  );
}

export default PageSelector;
