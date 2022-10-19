import { Box, Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import TabPanel from '@/components/TabPanel/TabPanel';
import { mainBox, tabPanelStyle } from './styles';

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
