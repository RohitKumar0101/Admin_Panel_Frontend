import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Slide } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomSnackbar({open,setOpen,message,color,closeSnackbar}) {

 
  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} onClick={closeSnackbar} onClose={closeSnackbar} transitionDuration={200}  anchorOrigin={{
      vertical: "top",
      horizontal: "right",
   }}>
      <Alert  severity={color||"success"} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}