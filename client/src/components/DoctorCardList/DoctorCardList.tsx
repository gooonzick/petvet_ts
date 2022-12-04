import { Box } from '@mui/material';
import React from 'react';
import { Doctor } from '../../models/models';
import DoctorCard from '../DoctorCard';

type Props = {
  docs: Doctor[]
};

function DoctorCardList({ docs }: Props) {
  return (
    <Box sx={{ mt: '0.7rem', width: '100%' }}>
      {docs.length > 0 && docs.map((doc, index) => (
        <DoctorCard key={doc.id} doc={doc} />
      ))}
    </Box>
  );
}

export default DoctorCardList;
