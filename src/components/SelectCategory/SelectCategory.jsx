
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Categories } from '../../Pages/Categories/Categories';

export const SelectCategoryForProduct = ({selectedCategory,CategoriesArray,SelectedCategoriesArray,setSelectedCategory,ChangeCategory}) => {

  // const handleChange = (event) => {
  //   setStatus(event.target.value);
  //   setAlert(event.target.value)
  // };
 
  
  return (
    <Box sx={{ maxWidth: "67%", }}>
      <FormControl fullWidth >
        <Select
          labelId="demo-simple-label"
          id="demo-simple"
          value={selectedCategory}
          // label="Age"
          onChange={ChangeCategory}      
         
        >
            {CategoriesArray && CategoriesArray.map((item)=>{
                return <MenuItem value={item.CategoryName} key={item.ID}  >{item.CategoryName}</MenuItem>
            })}


        </Select>
      </FormControl>
    </Box>
  );
}


