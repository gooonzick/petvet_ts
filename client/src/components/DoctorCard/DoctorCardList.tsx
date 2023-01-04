import { memo } from 'react';

import { Box, SxProps, Theme } from '@mui/material';

import { Doctor } from '@/models/models';

import DoctorCard from './DoctorCard';

type Props = {
  docs: Doctor[];
  onClick: (id: number) => void;
};

const docCardListWrapper: SxProps<Theme> = { mt: '0.7rem', width: '100%' };

function DoctorCardList({ docs, onClick }: Props) {
  return (
    <Box sx={docCardListWrapper}>
      {docs.length > 0 && docs.map((doc) => (
        <DoctorCard key={doc.id} doc={doc} onClick={onClick} />
      ))}
    </Box>
  );
}

export default memo(DoctorCardList);
