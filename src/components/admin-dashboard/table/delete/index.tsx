import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteType } from '@/types/btn';
import { useFetchProduct } from '@/api/products/products.queris';

const DeleteBtn: React.FC<deleteType> = (id) => {
  const [open, setOpen] = React.useState(false);
  const { data: deleteData, error } = useFetchProduct();

  const handleClickOpen = () => {
    setOpen(true);
    const ids = deleteData.data.products;
    console.log(ids);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          mx: 2,
          backgroundColor: 'red',
          color: 'white',
          ':hover': { backgroundColor: 'red', color: 'white' },
        }}
      >
        {' Delete'}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: 'blue' }}>
            لغو
          </Button>
          <Button onClick={handleClose} autoFocus sx={{ color: 'red' }}>
            تایید
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default DeleteBtn;
