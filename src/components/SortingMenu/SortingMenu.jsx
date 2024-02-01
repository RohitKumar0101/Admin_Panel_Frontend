
import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { SortItemsAscDsc } from '../../utility/Common';

export const SortMenu = ({ handleSort, name }) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);


  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    setOpen(false);
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

  };

  const SortProducts = (event) => {
    if (event.target.id) {
      const sortedArray = SortItemsAscDsc(event.target.id, name);
      handleSort(sortedArray);
      // setOpen(false);
      handleClose(event);
    }
    else {

    }
  }
  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (

    <div>
      <button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      // className='hover:bg-gray-200 rounded-full'
      >
        <MoreVertIcon color='action' sx={{ '&:hover': { backgroundColor: "lightgray", borderRadius: "100%" } }} />
      </button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem id='1' onClick={SortProducts}><div className='flex w-full'><ArrowUpwardIcon id='1' onClick={SortProducts} fontSize='small' color='action' /><h1 id='1' className='ml-2 text-opacity-75' onClick={SortProducts}>Sort in ASC</h1></div></MenuItem>
                  <MenuItem id='-1' onClick={SortProducts}><div className='flex w-full'>< ArrowDownwardIcon id='-1' onClick={SortProducts} fontSize='small' color='action' /><h1 id='-1' onClick={SortProducts} className='ml-2 text-opacity-75'>Sort in DSC</h1></div></MenuItem>
                  <MenuItem id='0' onClick={SortProducts}><div className='flex w-full'><h1 className='ml-7 '>   </h1><h1 id='0' onClick={SortProducts} className='text-opacity-75'>Unsort</h1></div></MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
