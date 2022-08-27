import { Box, makeStyles } from '@mui/material';
import { useSelector } from 'react-redux';
import PetCardList from '../../components/PetCardList/PetCardList';
import UserInfo from '../../components/UserInfo/UserInfo';
import { User } from '../../models/models';
import { RootState } from '../../redux/store';

function ProfilePage() {
  const user = useSelector((store: RootState) => store.auth.user) as User;
  return (
    <Box sx={{ padding: { xs: '2rem 1rem', md: '2rem 3rem' } }}>
      <UserInfo editable user={user} />
      <PetCardList pets={user.pets} />
    </Box>
  );
}

export default ProfilePage;
