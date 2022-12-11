import {
  Box, Button, Modal, Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '@/components/Loader/Loader';
import PriceListModal from './blocks/PriceList';
import UserInfo from '@/components/UserInfo';
import WordCard from '@/components/WordCard/WordCard';
import { useGetOneDocQuery } from '@/redux/api/doc.api';
import {
  buttonBoxStyle,
  buttonBoxWrapperStyle,
  descriptionStyle,
  mainBoxStyle,
  titleStyle,
  wordCardListStyle,
  wordCardWraperStyle,
} from './styles';
import Schedule from './blocks/Schedule';

function DocPublicPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetOneDocQuery(id!);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalNode, setModalNode] = useState<'priceList' | 'schedule' | null>(null);

  const openModal = useCallback((type: 'priceList' | 'schedule') => {
    setIsModalOpen(true);
    setModalNode(type);
  }, []);

  const modalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const renderModalBody = useCallback(() => {
    if (modalNode === 'priceList' && data) {
      return <PriceListModal priceList={data.priceList} />;
    }
    if (modalNode === 'schedule' && data) {
      return <Schedule schedules={data?.docSchedules} />;
    }
    return <div>dsdsa</div>;
  }, [data, modalNode]);

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
            <Box sx={buttonBoxWrapperStyle}>
              <Box sx={buttonBoxStyle}>
                <Button
                  variant="outlined"
                  sx={{ backgroundColor: 'white' }}
                  onClick={() => openModal('priceList')}
                >
                  Прайс лист
                </Button>
                <Button
                  variant="contained"
                  onClick={() => openModal('schedule')}
                >
                  Записаться
                </Button>
              </Box>
            </Box>
          </Box>
          <Modal
            open={isModalOpen}
            onClose={modalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div>
              {renderModalBody()}
            </div>
          </Modal>
        </>
      )}
    </Box>
  );
}

export default DocPublicPage;
