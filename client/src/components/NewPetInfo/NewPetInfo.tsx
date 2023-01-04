import {
  ChangeEvent, useCallback, useEffect, useState,
} from 'react';

import {
  Box, Button, FormControl, Grow,
  InputLabel, MenuItem, Modal, Select,
  TextField, Typography,
} from '@mui/material';

import * as styles from './styles';

const formHelper = (type: string) => {
  switch (type) {
    case 'visit':
      return {
        visitDate: new Date(),
        description: '',
        diagnose: '',
        treatment: '',
      };
    case 'allergy':
    case 'chronicDiseases':
      return {
        name: '',
      };
    case 'vaccinations':
      return {
        description: '',
        drugName: '',
        drugDate: new Date(),
      };
    default:
      return undefined;
  }
};

const validateHandler = (key: string, form: any): boolean => {
  if (!key) return false;
  const formData = form[key];
  switch (key) {
    case 'visit':
      return formData.description && formData.treatment && formData.diagnose;
    case 'allergy':
    case 'chronicDiseases':
      return !!formData.name;
    case 'vaccinations':
      return formData.drugName && formData.description;
    default:
      return false;
  }
};

function NewPetInfo({ open, closeHandler }: { open: boolean, closeHandler: () => void }) {
  const [newData, setNewData] = useState<any>(null);
  const [type, setType] = useState('');
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const check = validateHandler(type, newData);
    setValid(check);
  }, [newData, type]);

  const changeHandler = useCallback((value: string) => {
    if (!value) return;
    setType(value);
    const formData = formHelper(value);
    setNewData({ [value]: formData });
  }, []);

  const inputHandler = useCallback((e: ChangeEvent<HTMLInputElement>, key: string) => {
    if (!key) return;
    setNewData((prev: any) => ({
      [key]: {
        ...prev[key],
        [e.target.name]: e.target.value,
      },
    }));
  }, []);

  return (
    <Modal
      open={open}
      onClose={closeHandler}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Grow in={open}>
        <Box sx={styles.modalStyle}>
          <Box>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Что случилось?</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type ?? ''}
                label="Что случилось?"
                onChange={(e) => changeHandler(e.target.value)}
              >
                <MenuItem value="visit">Визит врача</MenuItem>
                <MenuItem value="allergy">Аллергия</MenuItem>
                <MenuItem value="chronicDiseases">Хроническая болезнь</MenuItem>
                <MenuItem value="vaccinations">Вакцинация/Обработка</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ marginTop: '0.5rem' }}>
              {type === 'chronicDiseases' && (
                <>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Хронические болезни</Typography>
                  <TextField
                    id="petallergies"
                    label="Болезнь"
                    variant="standard"
                    name="name"
                    type="text"
                    fullWidth
                    onChange={(e: ChangeEvent<HTMLInputElement>) => inputHandler(e, 'chronicDiseases')}
                  />
                </>
              )}
              { type === 'allergy' && (
                <>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Аллергия</Typography>
                  <TextField
                    id="petallergies"
                    label="Аллергия"
                    variant="standard"
                    name="name"
                    type="text"
                    fullWidth
                    onChange={(e: ChangeEvent<HTMLInputElement>) => inputHandler(e, 'allergy')}
                  />
                </>
              )}
              {type === 'vaccinations'
      && (
        <>
          <TextField
            name="description"
            label="Что давали/кололи?"
            variant="standard"
            type="text"
            value={newData.vaccinations.description}
            onChange={(e:ChangeEvent<HTMLInputElement>) => inputHandler(e, 'vaccinations')}
            sx={styles.textFieldStyle}
            fullWidth
          />
          <TextField
            name="drugName"
            label="Название препарата"
            variant="standard"
            type="text"
            value={newData.vaccinations.drugName}
            onChange={(e:ChangeEvent<HTMLInputElement>) => inputHandler(e, 'vaccinations')}
            sx={styles.textFieldStyle}
            fullWidth
          />
          <TextField
            name="drugDate"
            label="Когда?"
            variant="standard"
            type="date"
            value={(newData.vaccinations.drugDate as Date).toISOString().split('T')[0]}
            onChange={(e:ChangeEvent<HTMLInputElement>) => inputHandler(e, 'vaccinations')}
            sx={styles.textFieldStyle}
            fullWidth
          />
        </>
      )}
              {type === 'visit'
      && (
        <>
          <TextField
            name="description"
            label="Какие жалобы?"
            variant="standard"
            type="text"
            value={newData.visit.description}
            onChange={(e:ChangeEvent<HTMLInputElement>) => inputHandler(e, 'visit')}
            sx={styles.textFieldStyle}
            fullWidth
          />
          <TextField
            name="diagnose"
            label="Диагноз"
            variant="standard"
            type="text"
            value={newData.visit.diagnose}
            onChange={(e:ChangeEvent<HTMLInputElement>) => inputHandler(e, 'visit')}
            sx={styles.textFieldStyle}
            fullWidth
          />
          <TextField
            name="treatment"
            label="Лечение"
            variant="standard"
            type="text"
            value={newData.visit.treatment}
            onChange={(e:ChangeEvent<HTMLInputElement>) => inputHandler(e, 'visit')}
            sx={styles.textFieldStyle}
            fullWidth
          />
          <TextField
            name="drugDate"
            label="Когда?"
            variant="standard"
            type="date"
            value={(newData.visit.visitDate as Date).toISOString().split('T')[0]}
            onChange={(e:ChangeEvent<HTMLInputElement>) => inputHandler(e, 'visit')}
            sx={styles.textFieldStyle}
            fullWidth
          />
        </>

      )}
            </Box>
            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: '0.7rem', marginLeft: 'auto' }}
              disabled={!valid}
            >
              Добавить
            </Button>
          </Box>
        </Box>
      </Grow>
    </Modal>
  );
}

export default NewPetInfo;
