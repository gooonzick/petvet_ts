import {
  Modal, Box, Typography, TableContainer, Paper, Table,
  TableHead, TableRow, TableCell, TableBody, SxProps, Theme,
} from '@mui/material';
import { PriceList } from '../../models/models';

type Props = {
  open: boolean
  handleClose: () => void
  priceList: PriceList[]
}

const mainBoxStyle: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  border: '1px solid rgba(0,0,0,0.4)',
  boxShadow: 24,
  p: 4,
  borderRadius: '19px',
};

function PriceListModal({ open, handleClose, priceList }: Props) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={mainBoxStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h1">
          Прайс-лист на услуги
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>Услуга</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }} align="right">Цена (руб.)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {priceList.map((el) => (
                <TableRow
                  key={el.service}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
    </Modal>
  );
}

export default PriceListModal;
