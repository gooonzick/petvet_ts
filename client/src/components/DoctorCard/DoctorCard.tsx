import {
  Box, CardActionArea, SxProps, Theme,
} from '@mui/material';
import { Doctor } from '../../models/models';
import UserInfo from '../UserInfo/UserInfo';

const cardActionStyle: SxProps<Theme> = { boxShadow: '4px 4px 8px rgba(0,0,0,0.2)' };

type Props = {
  doc: Doctor;
  onClick: (id: number) => void;
};

function DoctorCard({ doc, onClick }: Props) {
  return (
    <CardActionArea sx={cardActionStyle} onClick={() => onClick(doc.id)}>
      <Box>
        <UserInfo
          user={doc}
          editable={false}
        />
      </Box>
    </CardActionArea>
  );
}

export default DoctorCard;
