import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteType } from '@/types/btn';

export default function DeleteBtn(DeleteBtn: deleteType, id: any) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
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
          <DialogContentText id="alert-dialog-description">
            ` آیا میخواهید آیتم را حذف کنید `{' '}
          </DialogContentText>
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
}
