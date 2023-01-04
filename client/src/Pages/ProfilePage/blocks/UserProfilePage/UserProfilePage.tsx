import { memo, useEffect } from 'react';
import { connect } from 'react-redux';

import { Box, CircularProgress } from '@mui/material';

import PetCardList from '@/components/PetCardList/PetCardList';
import UserInfo from '@/components/UserInfo/UserInfo';

import { useGetAllPetsQuery } from '@/redux/api/pet.api';

import { User } from '@/models/models';

import { parentBoxStyle } from './styles';

import { userSelector } from '@/redux/selectors/userSelector';
import { getPets } from '@/redux/slices/userSlice';
import { AppDispatch, RootState } from '@/redux/types';

type Props = {
  user: User;
  dispatch: AppDispatch;
};

const mapStateToProps = (state: RootState) => {
  const user = userSelector(state) as User;

  return {
    user,
  };
};

function UserProfilePage({ user, dispatch }: Props) {
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

export default connect(mapStateToProps)(memo(UserProfilePage));
