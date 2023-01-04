import {
  Box, CardActionArea, SxProps, Theme,
} from '@mui/material';

import { Doctor } from '../../models/models';
import UserInfo from '../UserInfo/UserInfo';

const cardActionStyle: SxProps<Theme> = {
  boxShadow: '4px 4px 8px rgba(0,0,0,0.2)',
  marginBottom: '8px',
};

type Props = {
  doc: Doctor;
  onClick: (id: number) => void;
};

function DoctorCard({ doc, onClick }: Props) {
  return (
    <Box sx={cardActionStyle}>
      <CardActionArea sx={{ overflow: 'hidden' }} onClick={() => onClick(doc.id)}>
        <UserInfo
          user={doc}
          editable={false}
        />
      </CardActionArea>
    </Box>
  );
}

export default DoctorCard;
