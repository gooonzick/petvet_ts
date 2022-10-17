import {
  Avatar, Box, CardActionArea, SxProps,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Doctor } from '../../models/models';
import UserInfo from '../UserInfo/UserInfo';

type Props = {
  doc: Doctor
}

function DoctorCard({ doc }: Props) {
  const navigate = useNavigate();
  return (
    <CardActionArea sx={{ boxShadow: '4px 4px 8px rgba(0,0,0,0.2)' }} onClick={() => navigate(`/vets/${doc.id}`)}>
      <Box>
        <UserInfo user={doc} editable={false} />
      </Box>
    </CardActionArea>
  );
}

export default DoctorCard;
