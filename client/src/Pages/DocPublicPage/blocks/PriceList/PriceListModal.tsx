import {
  Box, Paper, Table,
  TableBody,
  TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';

import { PriceList } from '@/models/models';

import { mainBoxStyle, tableHeaderCellStyle } from './styles';

type Props = {
  priceList: PriceList[]
};

function PriceListModal({ priceList }: Props) {
  return (
    <Box sx={mainBoxStyle}>
      <Typography id="modal-modal-title" variant="h6" component="h1">
        Прайс-лист на услуги
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={tableHeaderCellStyle}>Услуга</TableCell>
              <TableCell sx={tableHeaderCellStyle} align="right">Цена (руб.)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {priceList.map((el) => (
              <TableRow
                key={el.service}
              >
                <TableCell component="th" scope="row">
                  {el.service}
                </TableCell>
                <TableCell align="right">{el.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default PriceListModal;
