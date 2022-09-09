import { Box, CircularProgress, makeStyles } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DocExperience from '../../components/DocProfileInfo/DocExperience';
import PetCardList from '../../components/PetCardList/PetCardList';
import UserInfo from '../../components/UserInfo/UserInfo';
import { Doctor } from '../../models/models';
import { useGetAllPetsQuery } from '../../redux/api/pet.api';
import { getPets } from '../../redux/slices/userSlice';
import { RootState } from '../../redux/store';

function DocProfilePage() {
  const user = useSelector((store: RootState) => store.auth.user) as Doctor;
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess } = useGetAllPetsQuery();
  useEffect(() => {
    if (isSuccess) {
      dispatch(getPets(data));
    }
  }, [data]);
  return (
    <Box sx={{ padding: '2rem 3rem' }}>
      <UserInfo editable user={user} />
      <DocExperience text={user.docInfo.experience} />
    </Box>
  );
}

export default DocProfilePage;
