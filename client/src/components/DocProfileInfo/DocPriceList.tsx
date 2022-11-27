import {
  ChangeEvent, memo, useCallback, useState,
} from 'react';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Paper,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { red } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import { PriceList } from '../../models/models';
import { useDeleteDocInfoMutation, useUpdateDocInfoMutation } from '../../redux/api/doc.api';
import { updateUser } from '../../redux/slices/userSlice';

type Props = {
  priceList: PriceList[]
};

const collapsedAccordionStyle:SxProps<Theme> = {
  backgroundColor: '#D9D9D9',
  padding: 2,
  borderRadius: '9px',
  marginBottom: '0.5rem',
  transition: 'all .3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.01)',
  },
  boxShadow: 3,
  boxSizing: 'border-box',
};

const expandedAccordionStyle: SxProps<Theme> = {
  backgroundColor: 'white',
  p: 2,
  m: '.5rem',
  borderRadius: '9px',
  border: '.5px solid #FFD35A',
};

const saveEditButtonStyle: SxProps<Theme> = {
  color: 'black',
  borderRadius: '9px',
  p: '0.5rem',
  ml: 2,
};

const cancelButtonStyle: SxProps<Theme> = {
  color: 'black',
  borderRadius: '9px',
  p: '0.5rem',
  ml: 2,
};

const editButtonStyle: SxProps<Theme> = {
  color: 'black',
  borderRadius: '9px',
  p: '0.5rem',
};

const editAccordionStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  pt: 2,
  height: 'max-content',
};

const tableContainerStyle: SxProps<Theme> = {
  width: '85%',
  height: 'max-content',
  borderRadius: '9px',
};

const deleteButtonStyle: SxProps<Theme> = {
  color: red[600],
  cursor: 'pointer',
};

const serviceTextFieldStyle: SxProps<Theme> = {
  width: '50%',
  backgroundColor: 'white',
  mr: '0.5rem',
};

const priceTextFieldStyle: SxProps<Theme> = { backgroundColor: 'white' };

type PriceListEntry = { price: string, service: string };

function DocPriceList({ priceList }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState({
    service: '',
    price: '',
  });

  const dispatch = useDispatch();

  const [addService] = useUpdateDocInfoMutation();
  const [deleteService] = useDeleteDocInfoMutation();

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const neutral = theme.palette.warning.main;

  const addServiceHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const cancleEditHandler = useCallback(() => {
    setEdit(false);
  }, []);

  const saveEditHandler = useCallback(async (priceListEntry: PriceListEntry) => {
    // do some fetch
    if (!priceListEntry.price || !priceListEntry.service) return;
    const result = await addService({ priceList: priceListEntry }).unwrap();
    dispatch(updateUser(result));
    setEdit(false);
  }, [addService, dispatch]);

  const deleteServiceHandler = useCallback(async (id: number) => {
    // delete category
    if (!id) return;
    const result = await deleteService({ priceList: id }).unwrap();
    dispatch(updateUser(result));
  }, [deleteService, dispatch]);

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded((prev) => !prev)}
      sx={!expanded ? collapsedAccordionStyle : expandedAccordionStyle}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="pricelist-content"
        id="pricelist"
      >
        <Typography>Прайс-лист</Typography>
      </AccordionSummary>
      {edit
        ? (
          <>
            <AccordionDetails sx={editAccordionStyle}>
              <TextField
                id="service-input"
                variant="outlined"
                value={input.service || ''}
                name="service"
                sx={serviceTextFieldStyle}
                placeholder="Услуга"
                onChange={(e: ChangeEvent<HTMLInputElement>) => addServiceHandler(e)}
              />
              <TextField
                id="price-input"
                variant="outlined"
                value={input.price || ''}
                name="price"
                sx={priceTextFieldStyle}
                placeholder="Цена"
                onChange={(e: ChangeEvent<HTMLInputElement>) => addServiceHandler(e)}
              />
            </AccordionDetails>
            <AccordionActions>
              <Button
                onClick={() => cancleEditHandler()}
                size="small"
                sx={{ ...cancelButtonStyle, backgroundColor: neutral }}
              >
                Отмена
              </Button>
              <Button
                onClick={() => saveEditHandler(input)}
                size="small"
                sx={{ ...saveEditButtonStyle, backgroundColor: primary }}
              >
                Сохранить
              </Button>
            </AccordionActions>
          </>
        ) : (
          <AccordionDetails sx={editAccordionStyle}>
            {priceList.length > 0 ? (
              <TableContainer
                component={Paper}
                sx={{ ...tableContainerStyle, backgroundColor: neutral }}
              >
                <Table stickyHeader aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Услуга</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>Цена</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold', width: '2rem' }} />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {priceList.map((row) => (
                      <TableRow
                        key={row.id}
                      >
                        <TableCell component="th" scope="row">
                          {row.service}
                        </TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        <TableCell align="center">
                          <DeleteForeverIcon
                            sx={deleteButtonStyle}
                            onClick={() => deleteServiceHandler(row.id)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : 'Информация отсутствует'}
            <AccordionActions>
              <Button
                onClick={() => setEdit(true)}
                size="small"
                sx={{ ...editButtonStyle, backgroundColor: primary }}
              >
                Добавить
              </Button>
            </AccordionActions>
          </AccordionDetails>
        )}
    </Accordion>
  );
}

export default memo(DocPriceList);
