    import * as React from 'react';
    import TextField from '@mui/material/TextField';
    import Autocomplete from '@mui/material/Autocomplete';
    
    
    export const FilterItems = ({options,handleFilterOnCategory})=>
    {      
        console.log(options);
    //    const options = [];
        const [value, setValue] = React.useState(null);
        const [inputValue, setInputValue] = React.useState('');
        
      return (
        <div>
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                console.log("Value Changed");
                console.log(newValue);
                setValue(newValue);
                handleFilterOnCategory(newValue);
            }}
            size='small'
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue.trim());
            }}
            id="controllable-states-demo"
            options={options}
            sx={{ width: 190}}
            renderInput={(params) => <TextField  {...params} placeholder='Filter by Category' />}
          />
        </div>
      );
    }
    