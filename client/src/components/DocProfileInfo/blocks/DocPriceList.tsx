import {
  ChangeEvent, memo, useCallback, useState,
} from 'react';
import { useDispatch } from 'react-redux';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

import { useDeleteDocInfoMutation, useUpdateDocInfoMutation } from '@/redux/api/doc.api';

import { PriceList } from '@/models/models';

import {
  cancelButtonStyle,
  collapsedAccordionStyle,
  deleteButtonStyle,
  editAccordionStyle,
  editButtonStyle,
  expandedAccordionStyle,
  priceTextFieldStyle,
  saveEditButtonStyle,
  serviceTextFieldStyle,
  tableContainerStyle,
} from '../styles';
import { updateUser } from '@/redux/slices/userSlice';

type Props = {
  priceList: PriceList[]
};

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
