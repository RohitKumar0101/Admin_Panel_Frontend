import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DeleteAgreedProduct, DeleteAgreedRow } from '../../utility/Common';

export  const ConfirmDailog = ({ProductDeleteBoolean,ShowNewProducts,open,handleProductDeleteSnackbar, ProductRowForDelete,handleCloseProductDeleteDailog, handleDeleteSnackbar, ShowCategories, setOpen, rowData })=> {

  const handleDeleteRow = () => {
    if (rowData) {
      DeleteAgreedRow(rowData);
    }
    ShowCategories();
    handleClose();
    handleDeleteSnackbar();
    setTimeout(() => {
      handleDeleteSnackbar();
    }, 1000);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleProductRowDelete = (data) => {
    if(data){
      DeleteAgreedProduct(data);
    }
    ShowNewProducts();
    handleClose();
    handleProductDeleteSnackbar();
    setTimeout(() => {
      handleProductDeleteSnackbar();
    }, 1000);
  }

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{fontSize:"x-large"}}>
          Are you sure want to Delete ?
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
            Are You sure want to delete
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NO</Button>
          <Button onClick={() => ProductDeleteBoolean ? handleProductRowDelete(ProductRowForDelete) : handleDeleteRow(rowData)} >
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
