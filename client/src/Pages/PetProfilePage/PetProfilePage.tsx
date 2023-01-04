import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import Loader from '@/components/Loader/Loader';

import PageSelector from './blocks/PageSelector';
import PetHistory from './blocks/PetHistory';
import PetProfile from './blocks/PetProfile';

import { useGetOnePetQuery } from '@/redux/api/pet.api';

import { pageWraperBoxStyle } from './styles';

function PetProfilePage() {
  const { id } = useParams();
  const [page, setPage] = useState(1);

  const { data: pet, isLoading } = useGetOnePetQuery(Number(id));

  const clickHandler = useCallback((pageId: number) => {
    setPage(pageId);
  }, []);

  const renderBody = useCallback(() => {
    if (!pet) {
      return null;
    }

    if (page === 1) {
      return <PetProfile pet={pet} />;
    }
    if (page === 2) {
      return <PetHistory pet={pet} />;
    }

    return null;
  }, [page, pet]);

  if (isLoading) return <Loader />;

  return (
    <Box sx={pageWraperBoxStyle}>
      <PageSelector page={page} clickHandler={clickHandler} />
      {renderBody()}
    </Box>
  );
}

export default PetProfilePage;
