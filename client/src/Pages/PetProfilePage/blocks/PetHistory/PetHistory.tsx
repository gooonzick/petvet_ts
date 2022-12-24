import {
  useCallback, useMemo, useState,
} from 'react';

import {
  Box, Modal,
} from '@mui/material';

import { Pet } from '@/models/models';

import { floatinButtonStyle, parentBoxStyle } from './styles';

import DocHistory from '../DocHistory';
import VacHistory from '../VacHistory';
import FloatingActionsButton from '@/components/FloatingActionsButton';

export default function PetHistory({ pet }: { pet: Pet }) {
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [recordType, setRecordType] = useState<string | null>(null);

  const closeActions = useCallback(() => {
    setIsActionOpen(false);
  }, []);

  const openActions = useCallback(() => {
    setIsActionOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setRecordType(null);
  }, []);

  const clickAction = (value: string) => {
    setRecordType(value);
    setIsActionOpen(false);
  };

  const renderModalBody = useCallback(() => <div>{recordType}</div>, [recordType]);

  const actions = useMemo(() => [
    { lable: 'Визит', handleClick: () => clickAction('visit') },
    { lable: 'Болезнь', handleClick: () => clickAction('chronicDisease') },
  ], []);

  return (
    <Box sx={parentBoxStyle}>
      <VacHistory vaccinations={pet.vaccinations} />
      <DocHistory visits={pet.visits} />
      <FloatingActionsButton
        actions={actions}
        sx={floatinButtonStyle}
        open={isActionOpen}
        handleOpen={openActions}
        handleClose={closeActions}
      />
      <Modal open={Boolean(recordType)} onClose={closeModal}>
        <Box>{renderModalBody()}</Box>
      </Modal>
    </Box>
  );
}
