    import * as React from 'react';
    import TextField from '@mui/material/TextField';
    import Autocomplete from '@mui/material/Autocomplete';
import { GetCategoryOptions } from '../../utility/Common';
    
    
    export const FilterItems = ({CategoryFilterBoolean,options,handleFilterOnCategory})=>
    {      
        console.log(options);
        
    //    const options = [];
        const [value, setValue] = React.useState(null);
        const [inputValue, setInputValue] = React.useState('');
        const options1= GetCategoryOptions(CategoryFilterBoolean);
        
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
            options={options1}
            sx={{ width: 190}}
            renderInput={(params) => <TextField  {...params} placeholder='Filter by Category' />}
          />
        </div>
      );
    }
    