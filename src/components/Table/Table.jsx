import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TableFooter, TablePagination, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DateFormatConverter, HandleTableId } from '../../utility/Common';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import "./Table.css";
import { Categories } from '../../Pages/Categories/Categories';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { SortMenu } from '../SortingMenu/SortingMenu';

const TablePaginationActions = (props)=>{
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


export const CustomTable = ({ handleRestictEditCategory, CategoriesArray, ChangeStateFromButton, handleSortCategories, handleDeleteAgreeOpen, handleOpenEditCategoryForm, handleStatusChangeSnackbar }) => {
  const [page, setPage] = React.useState(0);
  const [name, setName] = React.useState("categories")
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, CategoriesArray.length - page * rowsPerPage);


  // Avoid a layout jump when reaching the last page with empty rows.


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  return (<TableContainer component={Paper} >
    <Table sx={{ minWidth: 650 , height:470 }} aria-label="simple table" >
      <TableHead style={{ fontWeight: "bold" }}>
        <TableRow>
          <TableCell align='center' style={{ fontWeight: "bolder" }}>id</TableCell>
          <TableCell align="center" style={{ fontWeight: "bolder" }}><div className='flex justify-center gap-2'><h1>Category Name</h1><SortMenu handleSort={handleSortCategories} name={name} /></div> </TableCell>
          <TableCell align="center" style={{ fontWeight: "bolder" }}>Created Date</TableCell>
          <TableCell align="center" style={{ fontWeight: "bolder" }}>Status</TableCell>
          <TableCell align="center" style={{ fontWeight: "bolder" }}>Action</TableCell>
        </TableRow>
      </TableHead>

      <TableBody >
        {((rowsPerPage > 0 && CategoriesArray) ? CategoriesArray.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : CategoriesArray).map((row, key) => (
          <TableRow
            key={row.CategoryName}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            style={{ verticalAlign: "top !important" }}
          >
            <TableCell align='center' component="th" scope="row">
              {row.ID}
            </TableCell>
            <TableCell align="center">{row.CategoryName}</TableCell>
            <TableCell align="center">{DateFormatConverter(row.Date)}</TableCell>
            {row.Status ?

              <TableCell align="center">
                <Tooltip title="Click here to change the Status" arrow>
                  <div className='flex justify-center'><h1 className='text-white bg-green-400 w-20 rounded font-semibold hover:bg-green-500 cursor-pointer' id={row.ID} onClick={ChangeStateFromButton}>Active</h1>
                  </div>
                </Tooltip>
              </TableCell> :
              <TableCell align="center">
                <Tooltip title="Click here to change the Status" arrow>
                  <div className='flex justify-center'><h1 onClick={ChangeStateFromButton} id={row.ID} className='text-white bg-orange-400 hover:bg-orange-500 cursor-pointer w-20 rounded font-semibold'>Inactive</h1>
                  </div>
                </Tooltip>
              </TableCell>}
            <TableCell align="center"><div className='flex gap-2 justify-center'><Button style={{ backgroundColor: "lightgray", color: "black", width: "5px" }} onClick={() => handleOpenEditCategoryForm(row)}><EditIcon /></Button > <Button onClick={() => handleDeleteAgreeOpen(row)} style={{ backgroundColor: "lightgray", color: "black", width: "5px" }}><DeleteIcon /></Button></div></TableCell>
          </TableRow>
        ))}
        {emptyRows > 0 && (
          <TableBody>
            {/* {Array.from({ length: emptyRows }, (_, index) => (
              <TableRow key={index} style={{ height: 53 }}>
                <TableCell colSpan={9} />
              </TableRow>
            ))} */}
          </TableBody>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, ,]}
            colSpan={5}
            count={CategoriesArray.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                'aria-label': 'rows per page',
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}


          />
        </TableRow>
      </TableFooter>
    </Table>
  </TableContainer>);
}