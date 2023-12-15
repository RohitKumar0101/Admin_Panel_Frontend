import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/Edit';
import { SignUpForm } from '../SignUpFrom';
import { EditTableForm } from '../EditTableForm/EditTableForm';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  height:600,
  bgcolor: 'skyBlue',
  boxShadow: 24,
  borderRadius: 3,
};

export default function EditTable({ setIsSignUP,setUserDetails,userDetails }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}><EditIcon/></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='w-full flex justify-end items-endpt-1'>
           <Button onClick={handleClose} style={{backgroundColor:"lightGray"}}><CloseIcon style={{color:"red",backgroundColor:"lightgray",}} /></Button>
          </div>
          <div className='relative'>
          <EditTableForm  userDetails={userDetails} setUserDetails={setUserDetails} handleClose={handleClose}/>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
