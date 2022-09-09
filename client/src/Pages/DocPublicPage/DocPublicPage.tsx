import {
  Box, Button, SxProps, Theme, Typography, useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import PriceListModal from '../../components/PriceListModal/PriceListModal';
import UserInfo from '../../components/UserInfo/UserInfo';
import WordCard from '../../components/WordCard/WordCard';
import { useGetOneDocQuery } from '../../redux/api/doc.api';

const mainBoxStyle: SxProps<Theme> = {
  width: { xs: '100%', sm: '100%', md: '70%' },
  height: '100vh',
  padding: { xs: '1rem', sm: '1rem', md: '2rem' },
  position: 'relative',
};
const wordCardWraperStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'column', md: 'row' },
  alignItems: { xs: 'start', sm: 'start', md: 'center' },
  marginTop: '0.7rem',
};
const wordCardListStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  marginTop: '0.7rem',
};
const titleStyle: SxProps<Theme> = {
  marginRight: '0.6rem',
};
const descriptionStyle: SxProps<Theme> = {
  marginTop: '3rem',
  minHeight: '15%',
  width: { xs: '80%', sm: '80%', md: '700px' },
  backgroundColor: '#D9D9D9',
  padding: '1rem',
  borderRadius: '8px',
  boxShadow: '8px 8px 10px rgba(0,0,0,0.4)',
};
const buttonBoxStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: { xs: 'center', sm: 'center', md: 'start' },
  justifyContent: { xs: 'center', sm: 'center', md: 'start' },
  flexDirection: { xs: 'row', sm: 'row', md: 'column' },
  width: { xs: '100%', sm: '100%', md: 'max-content' },
  gap: '0.5rem',
  position: 'fixed',
  top: { md: '80px' },
  bottom: { xs: '30px', sm: '30px', md: '' },
  right: { md: '30px' },
};

function DocPublicPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetOneDocQuery(id ?? '1');
  const [modals, setModals] = useState({
    priceList: false,
    schedule: false,
  });
  if (isLoading) return <Loader />;
  return (
    <Box sx={{ width: '100%' }}>
      {data
      && (
        <>
          <Box sx={mainBoxStyle}>
            <UserInfo editable={false} user={data} />
            <Box sx={wordCardWraperStyle}>
              <Typography variant="h6" sx={titleStyle}>Лечу</Typography>
              <Box sx={wordCardListStyle}>
                {data.profiles.map((p) => (
                  <WordCard
                    key={`${p.profile.id}-${p.profile.name}`}
                    editable={false}
                    text={p.profile.name}
                  />
                ))}
              </Box>
            </Box>
            <Box sx={wordCardWraperStyle}>
              <Typography variant="h6" sx={titleStyle}>Специализируюсь в</Typography>
              <Box sx={wordCardListStyle}>
                {data.categories.map((c) => (
                  <WordCard
                    key={`${c.category.id}-${c.category.name}`}
                    editable={false}
                    text={c.category.name}
                  />
                ))}
              </Box>
            </Box>
            <Box sx={descriptionStyle}>
              <Typography variant="h6">Описание</Typography>
              <Typography variant="body1">{data.docInfo.experience}</Typography>
            </Box>
          </Box>
          <Box sx={buttonBoxStyle}>
            <Button
              variant="outlined"
              onClick={() => setModals((prev) => ({ ...prev, priceList: true }))}
            >
              Прайс лист
            </Button>
            <Button variant="contained">Записаться</Button>
          </Box>
          {modals.priceList && (
            <PriceListModal
              priceList={data.priceList}
              open={modals.priceList}
              handleClose={() => setModals((prev) => ({ ...prev, priceList: false }))}
            />
          )}
        </>
      )}
    </Box>
  );
}

export default DocPublicPage;
