
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const CustomSelect = ({status,ChangeStatus})=>{

  // const handleChange = (event) => {
  //   setStatus(event.target.value);
  //   setAlert(event.target.value)
  // };

  return (
    <Box sx={{ maxWidth: "67%", }}>
      <FormControl fullWidth>
        {/* <InputLabel id="test-select-label">Status</InputLabel> */}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          // label="Age"
          onChange={ChangeStatus}
        >
          <MenuItem value={1} selected>Active</MenuItem>
          <MenuItem value={0} >Inacitve</MenuItem>
          
        </Select>
      </FormControl>
    </Box>
  );
}


