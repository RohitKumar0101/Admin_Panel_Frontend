import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/Edit';
import { SignUpForm } from '../SignUpFrom';
import { EditTableForm } from '../EditTableForm/EditTableForm';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';
import { hover } from '@testing-library/user-event/dist/hover';
import { blue, green } from '@mui/material/colors';
import CustomSnackbar from '../../Snackbar/Snackbar';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  height: 600,
  backgroundColor: "white",
  boxShadow: 24,
  borderRadius: 3,


};


export default function EditTable({ setIsSignUP, setUserDetails, userDetails,snackerOpen,handleSnacker }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Tooltip title="Edit details" arrow>
        <Button sx={{
          "&:hover": {
            color: "blue",
            backgroundColor: "lightBLue !important",
            boxShadow: "none !important",
          }
        }} onClick={handleOpen}><EditIcon style={{ color: "gray" }} /></Button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <div className='w-11/12 flex justify-end items-end ml-9 '>
            <button onClick={handleClose}><CloseIcon sx={{'&:hover':{backgroundColor:"lightBLue"}}} style={{ color: "red",height:"20px",borderRadius:"3px"}} /></button>
          </div> */}
          <div className='relative mt-7'>
            <EditTableForm userDetails={userDetails} setUserDetails={setUserDetails} handleClose={handleClose} open={snackerOpen} handleSnacker={handleSnacker} />
          </div>
        </Box>
      </Modal>
        <CustomSnackbar open={snackerOpen}  message="Changes updated successfully" />
    </div>
  );
}
