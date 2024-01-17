import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { CartTotalAmount } from '../../utility/SessionStorage';
import { height } from '@mui/system';
import { PriceFormat } from '../../utility/Common';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';

export const Summary = ({cartItems,toggleDrawer,state,closeDrawer,handlePaymentCompletionModal})=>{
 
  const handleClose = ()=>{
    console.log("Closing summary section")
    closeDrawer("right", false);
  }
  
  
  const list = (anchor) => (
    <Box
    sx={{ width: 300 ,height:"min-content",maxHeight:"97vh",minHeight:50,padding:"5px"}}
    role="presentation"
    // onClick={toggleDrawer(anchor, false)}
    // onKeyDown={toggleDrawer(anchor, false)}
    >      
    <div className='w-full flex justify-end ' ><Tooltip title="Close cart" arrow><CloseIcon onClick={handleClose} sx={{cursor:"pointer",color:"white",backgroundColor:"red",borderRadius:"10%"}} color='danger'/></Tooltip></div>
     {cartItems.length?<div className="bg-white mr-7 w-full rounded shadow gap-4 ">
                        <h1 className="mt-2 mb-5 text-center font-bold opacity-90">Order Summary</h1>
                        <div className="flex flex-col items-cente ml-2 mr-2 gap-4">
                            {cartItems && cartItems.map((product) => {
                                   if(product.Quantity<1){
                                    return;
                                   }
                                return <div className="w-full flex flex-col gap-4">
                                    <div className="w-full flex justify-center items-center">

                                        <span className="w-2/4 flex justify-start">{product.ProductName}</span>
                                        <span className="text-xs opacity-75 flex justify-start w-1/4">x {product.Quantity}</span>
                                        <span className="w-1/4 flex justify-end">{PriceFormat(product.Total)}</span>
                                    </div>
                                    <h1 className="border border-black border-1 opacity-5"></h1>

                                </div>
                            })
                            }
                            <div className="flex w-full justify-end items-center gap-10 opacity-95"><label className="font-bold">TOTAL:</label><span className="font-semibold text-lg">{PriceFormat(CartTotalAmount())}</span></div>
                             <Button variant='contained' sx={{marginBottom:"1rem"}} onClick={handlePaymentCompletionModal}>Complete Payment</Button>
                        </div>
                    </div> : <div className='flex justify-center'>No, Item added in cart</div>}
    </Box>
  );

  return (
    <div>
      {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            // onClose={toggleDrawer(anchor, false)}
            PaperProps={{ style: {height:"min-content", overflow: 'auto'} }}
           
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
