import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, SxProps, Theme } from '@mui/material';
import { useGetOnePetQuery } from '../../redux/api/pet.api';
import { RootState } from '../../redux/store';
import Loader from '../../components/Loader/Loader';
import PetProfile from '../../components/PetProfile/PetProfile';

const pageWraperBoxStyle: SxProps<Theme> = {
  padding: '1rem',
};

function PetProfilePage() {
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.auth.user);
  const { data: pet, isLoading, isError } = useGetOnePetQuery(Number(id));

  if (isLoading) return <Loader />;

  return (
    <Box sx={pageWraperBoxStyle}>
      <PetProfile pet={pet} />
    </Box>
  );
}

export default PetProfilePage;
