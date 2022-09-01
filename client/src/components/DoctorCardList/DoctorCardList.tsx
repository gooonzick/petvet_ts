import { Box } from '@mui/material';
import React from 'react';
import { Doctor } from '../../models/models';
import DoctorCard from '../DoctorCard/DoctorCard';

type Props = {
    docs: Doctor[]
}

function DoctorCardList({ docs }: Props) {
  return (
    <Box sx={{ mt: 10 }}>
      {docs.length > 0 && docs.map((doc, index) => (
        <DoctorCard key={index} doc={doc} />
      ))}
    </Box>
  );
}

export default DoctorCardList;
