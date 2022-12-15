import { Box, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PetCardList from '@/components/PetCardList/PetCardList';
import UserInfo from '@/components/UserInfo/UserInfo';
import { User } from '@/models/models';
import { useGetAllPetsQuery } from '@/redux/api/pet.api';
import { getPets } from '@/redux/slices/userSlice';
import { RootState } from '@/redux/types';
import { parentBoxStyle } from './styles';

function UserProfilePage() {
  const user = useSelector((store: RootState) => store.auth.user) as User;

  const dispatch = useDispatch();

  const { data, isLoading, isSuccess } = useGetAllPetsQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(getPets(data));
    }
  }, [data]);

  return (
    <Box sx={parentBoxStyle}>
      <UserInfo editable user={user} />
      {isLoading ? <CircularProgress /> : <PetCardList pets={user.pets} />}
    </Box>
  );
}

export default UserProfilePage;
