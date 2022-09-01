import { Box } from '@mui/material';
import React, { useState } from 'react';
import DoctorCardList from '../../components/DoctorCardList/DoctorCardList';
import { useGetAllDocsQuery } from '../../redux/api/doc.api';

function DocSearchPage() {
  const [docFilter, setDocFilter] = useState({
    profileName: '',
    categoryName: '',
    userName: '',
  });
  const { data } = useGetAllDocsQuery(docFilter);

  console.log(data);

  return (
    <Box>
      {data && <DoctorCardList docs={data} />}
    </Box>
  );
}

export default DocSearchPage;
