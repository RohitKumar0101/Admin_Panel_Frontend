import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { HandleTableId } from '../../utility/utility';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export const CustomTable = ({CategoriesArray,ChangeStateFromButton,handleOpenEditCategoryForm})=>{
 
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead style={{fontWeight:"bold"}}>
          <TableRow>
            <TableCell align='center'  style={{fontWeight:"bolder"}}>id</TableCell>
            <TableCell align="center" style={{fontWeight:"bolder"}}>Category Name</TableCell>
            <TableCell align="center"  style={{fontWeight:"bolder"}}>CreatedDate</TableCell>
            <TableCell align="center"  style={{fontWeight:"bolder"}}>Status</TableCell>
            <TableCell align="center"  style={{fontWeight:"bolder"}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {CategoriesArray && CategoriesArray.map((row, key) => (
            <TableRow
              key={row.CategoryName}
              sx={{ '&:last-child td, &:last-child th': { border: 0} }}
            >
              <TableCell align='center' component="th" scope="row">
                {key + 1}
              </TableCell>
              <TableCell align="center">{row.CategoryName}</TableCell>
              <TableCell align="center">{row.Date}</TableCell>
              {row.Status ? <TableCell align="center"><div className='flex justify-center'><h1 className='text-white bg-green-400 w-20 rounded font-semibold hover:bg-green-500 cursor-pointer' id={row.CategoryName} onClick={ChangeStateFromButton}>Active</h1></div></TableCell> : <TableCell align="center"><div className='flex justify-center'><h1 onClick={ChangeStateFromButton} id={row.CategoryName} className='text-white bg-orange-400 hover:bg-orange-500 cursor-pointer w-20 rounded font-semibold'>Inactive</h1></div></TableCell>}
              <TableCell align="center"><div className='flex gap-2 justify-center'><Button style={{backgroundColor:"lightgray", color:"black",width:"5px"}} onClick={handleOpenEditCategoryForm}><EditIcon/></Button > <Button style={{backgroundColor:"lightgray", color:"black",width:"5px"}}><DeleteIcon/></Button></div></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}