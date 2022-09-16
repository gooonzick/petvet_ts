import {
  Box, SxProps, Tab, Tabs, Theme,
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import TabPanel from '../../components/TabPanel/TabPanel';

type Props = {}

const mainBox: SxProps<Theme> = {
  width: { xs: '80%', sm: '80%', md: '40vw' },
  minHeight: '40vh',
  maxHeight: 'max-content',
  margin: '10vh auto',
  padding: '1rem',
  borderRadius: '10px',
  boxShadow: '8px 8px 10px rgba(0,0,0,0.3)',
};

const tabPanelStyle: SxProps<Theme> = { borderBottom: 1, borderColor: 'divider' };

function SchedulePage() {
  const [tabIndex, setTabIndex] = useState(0);

  const tabChangeHandler = (event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };
  return (
    <Box sx={mainBox}>
      <Box sx={tabPanelStyle}>
        <Tabs value={tabIndex} onChange={tabChangeHandler}>
          <Tab label="Вход" />
          <Tab label="Регистрация" />
        </Tabs>
      </Box>

      <TabPanel value={tabIndex} index={0}>
        Bla
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        Bla2
      </TabPanel>
    </Box>
  );
}

export default SchedulePage;
