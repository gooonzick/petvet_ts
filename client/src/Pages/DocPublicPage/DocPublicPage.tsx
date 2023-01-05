import { memo, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  Box, Button, Modal, Typography,
} from '@mui/material';

import Loader from '@/components/Loader/Loader';
import UserInfo from '@/components/UserInfo';
import WordCard from '@/components/WordCard/WordCard';

import PriceListModal from './blocks/PriceList';
import Schedule from './blocks/Schedule';

import { useGetOneDocQuery } from '@/redux/api/doc.api';

import { RootState } from '@/redux/types';

import {
  buttonBoxStyle,
  buttonBoxWrapperStyle,
  descriptionStyle,
  mainBoxStyle,
  titleStyle,
  wordCardListStyle,
  wordCardWraperStyle,
} from './styles';

import { userSelector } from '@/redux/selectors/userSelector';

const mapStateToProps = (state: RootState) => {
  const userId = userSelector(state)?.id;

  return {
    userId,
  };
};

type Props = {
  userId: number | undefined;
};

function DocPublicPage({ userId }: Props) {
  const { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalNode, setModalNode] = useState<'priceList' | 'schedule' | null>(null);

  const { data, isLoading, refetch } = useGetOneDocQuery(id!);

  const openModal = useCallback((type: 'priceList' | 'schedule') => {
    setIsModalOpen(true);
    setModalNode(type);
  }, []);

  const modalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onResult = useCallback(() => {
    refetch().then((_) => modalClose());
  }, [modalClose, refetch]);

  const renderModalBody = useCallback(() => {
    if (modalNode === 'priceList' && data) {
      return <PriceListModal priceList={data.priceList} />;
    }
    if (modalNode === 'schedule' && data) {
      return (
        <Schedule
          schedules={data?.docSchedules}
          docId={id}
          userId={userId}
          onResult={onResult}
        />
      );
    }
    return null;
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

export default connect(mapStateToProps)(memo(DocPublicPage));
