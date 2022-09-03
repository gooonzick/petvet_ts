import {
  Avatar, Box, CardActionArea, SxProps,
} from '@mui/material';
import { Doctor } from '../../models/models';
import UserInfo from '../UserInfo/UserInfo';

type Props = {
  doc: Doctor
}

const docCardBox: SxProps = {
  marginBottom: '1rem',
  padding: '0.5rem',
  borderRadius: '8px',
  boxShadow: '8px 8px 10px rgba(0,0,0,0.2)',
};

function DoctorCard({ doc }: Props) {
  return (
    <CardActionArea sx={docCardBox}>
      <Box>
        <UserInfo user={doc} editable={false} />
      </Box>
    </CardActionArea>
  );
}

export default DoctorCard;
