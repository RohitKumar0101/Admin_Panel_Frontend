import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = ()=>{
  return (
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
        backgroundImage:"@URL("https://wallpapers.com/images/hd/savannah-trees-in-summer-caymrsfxah94j8wj.webp")"
      }}
    >
      <TextField  id="fullWidth" />
      <SearchIcon/>

    </Box>
  );
}
