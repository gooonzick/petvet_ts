import {
  Modal, Box, Typography, TableContainer, Paper, Table,
  TableHead, TableRow, TableCell, TableBody, SxProps, Theme, Grow,
} from '@mui/material';
import { PriceList } from '../../models/models';

type Props = {
  open: boolean
  handleClose: () => void
  priceList: PriceList[]
}

const mainBoxStyle: SxProps<Theme> = {
  width: '70%',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid rgba(0,0,0,0.4)',
  boxShadow: 24,
  p: 4,
  borderRadius: '19px',
  animation: 'open 0.2s ease-in-out',
  '@keyframes open': {
    '0%': {
      opacity: 0,
      transform: 'sacleY(0) translate(-50%, -50%)',
    },
    '100%': {
      opacity: 1,
      transform: 'sacleY(1) translate(-50%, -50%)',
    },
  },
};

const tableHeaderCellStyle: SxProps<Theme> = {
  fontWeight: 'bold',
  fontSize: 16,
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
    </Modal>

  );
}

export default PriceListModal;
