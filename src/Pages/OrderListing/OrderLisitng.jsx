import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { Layout } from "../../Layout/Layout"
import * as React from 'react';
import { getAllOrdersDetails, getAllOrdersDetailsOfCustomerByID, getCustomerElementIndexByID, getMobileIDOfLoggedCustomer } from "../../utility/Common2";
import { BillTable } from '../../components/BillTable/BillTable';

const descendingComparator = (a, b, orderBy) => {

    if (b[orderBy] < a[orderBy]) {

        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
const stableSort = (array, comparator) => {
    if (!array) {
        return
    }
    const stabilizedThis = array.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {

        const order = comparator(a[0], b[0]);

        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });

    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'orderID',
        numeric: false,
        disablePadding: false,
        label: 'Order ID',
    },
    {
        id: 'createdDate',
        numeric: false,
        disablePadding: false,
        label: 'Ordered Date',
    },
    {
        id: 'paymentStatus',
        numeric: false,
        disablePadding: false,
        label: 'Payment Status',
    },
    {
        id: 'totalAmount',
        numeric: true,
        disablePadding: false,
        label: 'Amount',
    },
    {
        id: 'protein',
        numeric: true,
        disablePadding: false,
        label: 'Protein (g)',
    },
];

const EnhancedTableHead = (props) => {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {

        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow sx={{
                "& th": {
                    fontSize: "1rem",
                    color: "white",
                    backgroundColor: "gray"
                }
            }}>


                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        // align='center'
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = () => {


    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },

            }}
        >


            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
                align='left'
            >
                Orders:</Typography>





        </Toolbar>
    );
}















export const OrderListing = ({ file }) => {
    const [CustomerID, setCustomerID] = React.useState(getMobileIDOfLoggedCustomer())
    const loggedCustomerIndex = getCustomerElementIndexByID(CustomerID);
    const [rows, setRows] = React.useState(getAllOrdersDetailsOfCustomerByID(CustomerID))
    const [openBillTable, setOpenBillTable] = React.useState(false);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('totalAmount');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);

    const [rowsPerPage, setRowsPerPage] = React.useState(6);

    console.log(CustomerID);
    console.log(rows);
    // const handleUserData = () => {
    //     console.log("Setting data");
    //     console.log(getAllUserData())
    //     let data = getAllUserData();
    //     setUserData(data);
    // }

    // React.useEffect(() => {
    //     handleUserData();
    //     console.log(userData)
    // }, [])

    console.log(openBillTable);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const consoleModal = () => {
        console.log(openBillTable);
    }

    const handleBillModal = () => {
        console.log(openBillTable);
        console.log("Bill Modal State Changed")
        setOpenBillTable(true);
        consoleModal();

    }
    const handleCloseBillModal = () => {
        setSelected([]);
        console.log("Bill Modal State Changed")
        console.log(openBillTable);
        setOpenBillTable(false)
        consoleModal();
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, row) => {
        const id = row.orderID
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            // newSelected = newSelected.concat(selected, id);
            newSelected.push(id)
            setSelected(newSelected);
        }
        else if (selectedIndex === 0) {
            // newSelected = newSelected.concat(selected.slice(1));
            return;
        }
        handleBillModal();
        // else if (selectedIndex === selected.length - 1) {
        //     newSelected = newSelected.concat(selected.slice(0, -1));
        // } else if (selectedIndex > 0) {
        //     newSelected = newSelected.concat(
        //         selected.slice(0, selectedIndex),
        //         selected.slice(selectedIndex + 1),
        //     );
        // }
        // setSelected(newSelected);
    };



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            rows && stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );

    return <Layout file={file}>


        <div className="h-full w-full p-5">
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} />
                    <TableContainer style={{ maxHeight: "430px", height: "430px" }} >
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                            stickyHeader
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                
                                onRequestSort={handleRequestSort}
                                rowCount={rows ? rows.length : 0}
                            />
                            <TableBody>
                                {(rows.length > 0) ? visibleRows.map((row, index) => {
                                    //here 
                                    const isItemSelected = isSelected(row.orderID);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => { handleClick(event, row) }}
                                            // role="checkbox"
                                            // aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.orderID}
                                            selected={isItemSelected}
                                            sx={{ cursor: 'pointer' }}
                                        >

                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="normal"
                                            >
                                                {row.orderID}
                                            </TableCell>
                                            <TableCell align="left">{row.createdDate}</TableCell>
                                            <TableCell align="left">{row.paymentStatus}</TableCell>
                                            <TableCell align="right">{row.totalAmount}</TableCell>
                                            <TableCell align="right">{row.orderID}</TableCell>
                                        </TableRow>
                                    );
                                }) :
                                    <TableRow><TableCell align='center' height={360} colSpan={10}>No Orders Avilable</TableCell></TableRow>
                                }
                                {/* {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )} */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[6, 10, 25]}
                        component="div"
                        count={rows ? rows.length : 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}

                    />
                </Paper>

            </Box>

            {selected && selected[0] ? <BillTable handleBillModal={() => handleCloseBillModal()} customerID={CustomerID} customerIndex={loggedCustomerIndex} open={openBillTable} orderID={selected ? selected[0] : []} /> : ""}
        </div>

    </Layout>
    // {(userData) && userData.orders.map((order) => {
}

