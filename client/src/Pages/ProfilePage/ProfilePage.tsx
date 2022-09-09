import { Box, CircularProgress, makeStyles } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PetCardList from '../../components/PetCardList/PetCardList';
import UserInfo from '../../components/UserInfo/UserInfo';
import { User } from '../../models/models';
import { useGetAllPetsQuery } from '../../redux/api/pet.api';
import { getPets } from '../../redux/slices/userSlice';
import { RootState } from '../../redux/store';
import DocProfilePage from './DocProfilePage';
import UserProfilePage from './UserProfilePage';

function ProfilePage() {
  const user = useSelector((store: RootState) => store.auth.user) as User;
  return user.userGroupId === 1 ? <DocProfilePage /> : <UserProfilePage />;
}

export default ProfilePage;
