import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/Edit';
import { Tooltip } from '@mui/material';
// import CustomSnackbar from '../../Snackbar/Snackbar';
import { InventoryForm } from '../InventoryForm/InventoryForm';

const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  height: 500,
  backgroundColor: "white",
  boxShadow: 24,
  borderRadius: 3,


};


export const CustomModal = ({open,handleOpen,handleClose,children})=>{

  return (<div>
      {/* <Tooltip title="Edit details" arrow> */}
        {/* <Button sx={{
          "&:hover": {
            color: "blue",
            backgroundColor: "lightBLue !important",
            boxShadow: "none !important",
          }
        }} onClick={handleOpen}><EditIcon style={{ color: "gray" }} /></Button> */}
      {/* </Tooltip> */}
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
            {children}
          </div>
        </Box>
      </Modal>
        {/* <CustomSnackbar open={snackerOpen}  message="Changes updated successfully" /> */}
    </div>
  );
}
