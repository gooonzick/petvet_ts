import {
  useCallback, useMemo, useState,
} from 'react';

import {
  Box, Modal,
} from '@mui/material';

import FloatingActionsButton from '@/components/FloatingActionsButton';

import { Pet } from '@/models/models';

import { floatinButtonStyle, modalBodyContainer, parentBoxStyle } from './styles';

import DocHistory from '../DocHistory';
import NewAllergy from '../NewAllergy';
import NewChronicDisease from '../NewChronicDisease';
import NewVaccination from '../NewVaccination';
import VacHistory from '../VacHistory';

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

  const renderModalBody = useCallback(() => {
    let node;
    if (recordType === 'allergy') {
      node = <NewAllergy petId={pet.id} />;
    }
    if (recordType === 'chronicDisease') {
      node = <NewChronicDisease petId={pet.id} />;
    }
    if ('vaccination') {
      node = <NewVaccination petId={pet.id} />;
    }
    return <Box sx={modalBodyContainer}>{node}</Box>;
  }, [recordType]);

  const actions = useMemo(() => [
    { lable: 'Визит', handleClick: () => clickAction('visit') },
    { lable: 'Болезнь', handleClick: () => clickAction('chronicDisease') },
    { lable: 'Аллергия', handleClick: () => clickAction('allergy') },
    { lable: 'Лекарство', handleClick: () => clickAction('vaccination') },
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
