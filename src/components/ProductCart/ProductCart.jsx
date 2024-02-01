import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./ProductCart.css";
import { GiveProductsOfCategory, PriceFormat } from '../../utility/Common';
import { QuantityInput } from '../QuantityInput/QuantityInput';
import { GetTotalByID } from '../../utility/Common2';




export const  ProductCart = ({ ID, refresh, setRefresh,loggedCustomerIndex,handleUnavailableSnackbar })=>{
    // const [products,setProducts] = React.useState(GiveProductsOfCategory(ID));

  let products = GiveProductsOfCategory(ID);
  if (products < 5) {
    var emptyRows = 3;
  }

  const handleQuantityAdd = (ID, Qty) => {

  }
  const handleRefresh = () => {
    setRefresh(prev => !prev);
  }

  const handleScroll = (event) => {
    
    // const target = event.target;

    // // Check if scrolled to the bottom
    // if (Math.round(target.scrollHeight - Math.round(target.scrollTop)) <= target.clientHeight) {
    //   // alert('Scrolled to bottom!');
    //   let newproducts = [...products, ...[{
    //     "ProductName": "xyz",
    //     "ProductPrice": 4440,
    //     "ProductQuantity": 30,
    //     "Status": 1,
    //     "Date": "2022-04-17",
    //     "SelectedCategory": "Fruits",
    //     "CategoryID": 1704718996346,
    //     "ID": 1705483882206
    //   }]];
      // setProducts(newproducts)
      // Perform actions when scrolled to the bottom
    // }
  };

  return (
    <TableContainer component={Paper} sx={{ height: 380 }}  onScroll={handleScroll}>
      <Table sx={{ minWidth: 450 }}  aria-label="simple table" stickyHeader >
        <TableHead>
          <TableRow sx={{
              "& th": {
                fontSize: "1rem",
                color: "white",
                backgroundColor: "gray"
              }
            }}>
            <TableCell >Product</TableCell>
            <TableCell align="center" >Avilability</TableCell>
            <TableCell align="center">Price&nbsp;(Rs.)</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Total&nbsp;(Rs.)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
            {products.length>0?products.map((product) => (
              <TableRow
              key={product.ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              <TableCell component="th" scope="row" width={200}>
              {product.ProductName}
              </TableCell>
              <TableCell align="center">{product.Status == 1 ? <div className='flex justify-center'><h1 className='bg-green-400 w-2/12  font-bold text-white rounded'>A</h1></div> : <div className='flex justify-center'><h1 className='bg-red-500 w-2/12  font-bold text-white rounded'>UA</h1></div>}</TableCell>
              <TableCell align="center">{PriceFormat(product.ProductPrice)}</TableCell>
              <TableCell align="center"><QuantityInput loggedCustomerIndex={loggedCustomerIndex} handleUnavailableSnackbar={handleUnavailableSnackbar} handleRefresh={handleRefresh}  data={product} /></TableCell>
              <TableCell align="center">{PriceFormat(GetTotalByID(product.ID,loggedCustomerIndex))}</TableCell>
            </TableRow>
            )):<TableRow colSpan="5" ><TableCell align='center' height={320} colSpan={9}>No Products Added</TableCell></TableRow>}
            
        </TableBody>
        {/* {emptyRows > 0 && (
          <TableBody>
            {Array.from({ length: emptyRows }, (_, index) => (
              <TableRow key={index} style={{ height: 53 }}>
                <TableCell colSpan={9} />
              </TableRow>
            ))}
          </TableBody>)} */}
      </Table>
    </TableContainer>
  );
}
