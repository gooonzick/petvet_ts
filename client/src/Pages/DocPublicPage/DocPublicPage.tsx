import {
  Box, Button, Typography, useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import PriceListModal from '../../components/PriceListModal/PriceListModal';
import UserInfo from '../../components/UserInfo/UserInfo';
import WordCard from '../../components/WordCard/WordCard';
import { useGetOneDocQuery } from '../../redux/api/doc.api';
import {
  buttonBoxStyle,
  descriptionStyle,
  mainBoxStyle,
  titleStyle,
  wordCardListStyle,
  wordCardWraperStyle,
} from './styles';

function DocPublicPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetOneDocQuery(id!);
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
              sx={{ backgroundColor: 'white' }}
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
