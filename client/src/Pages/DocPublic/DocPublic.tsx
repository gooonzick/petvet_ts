import { Box } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import UserInfo from '../../components/UserInfo/UserInfo';
import { useGetOneDocQuery } from '../../redux/api/doc.api';

type Props = {}

function DocPublic() {
  const { id } = useParams();
  const { data, isLoading } = useGetOneDocQuery(id ?? '1');
  return (
    <Box>
      {data && <UserInfo editable={false} user={data} />}
    </Box>
  );
}

export default DocPublic;
