import { Avatar, Box, CardActionArea } from '@mui/material';
import { Doctor } from '../../models/models';
import UserInfo from '../UserInfo/UserInfo';

type Props = {
    doc: Doctor
}

function DoctorCard({ doc }: Props) {
  return (
    <CardActionArea>
      <Box>
        <UserInfo user={doc} editable={false} />
      </Box>
    </CardActionArea>
  );
}

export default DoctorCard;
