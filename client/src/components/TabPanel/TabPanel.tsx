import { Box } from '@mui/material';
import React from 'react';

interface TabPanelProps {
    children: React.ReactNode;
    index: number;
    value: number;
  }

export default function TabPanel(props: TabPanelProps) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      {value === index && (
      <Box sx={{ width: '70%', margin: '1rem auto' }}>
        {children}
      </Box>
      )}
    </div>
  );
}
