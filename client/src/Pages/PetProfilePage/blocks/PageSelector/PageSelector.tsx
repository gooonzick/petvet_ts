import {
  Box, Button,
} from '@mui/material';

import * as styles from './styles';

type Props = {
  page: number;
  clickHandler: (pageId:number) => void
};

function PageSelector({ page, clickHandler }: Props) {
  return (
    <Box sx={styles.buttonsWraperStyle}>
      <Button
        onClick={() => clickHandler(1)}
        name="quest"
        sx={page === 1 ? styles.activeBtn : styles.btnStyles}
        key="one"
      >
        Анкета
      </Button>
      <Button
        onClick={() => clickHandler(2)}
        name="history"
        sx={page === 2 ? styles.activeBtn : styles.btnStyles}
        key="two"
      >
        История
      </Button>
    </Box>
  );
}

export default PageSelector;
