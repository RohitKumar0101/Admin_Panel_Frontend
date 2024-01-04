import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./ListingTable.css";
import { saveAs } from 'file-saver';
import SearchIcon from '@mui/icons-material/Search';
import { Tooltip } from '@mui/material';



const columns = [
    { field: 'ID', headerName: 'ID', headerClassName: 'table-header', cellClassName: "!justify-center",headerAlign: 'center' },
    { field: 'ProductName', headerName: 'Product Name', headerClassName: 'table-header', flex: 1, cellClassName: "!justify-center", headerAlign: 'center' },
    { field: 'SelectedCategory', headerName: 'Category Name', headerClassName: 'table-header', flex: 1, cellClassName: "!justify-center", headerAlign: 'center' },
    {
        field: 'ProductQuantity',
        headerName: 'Product Quantity',
        type: 'number',
        flex: 1,
        headerClassName: 'table-header',
        headerAlign: 'center',
        cellClassName: "!justify-center"
    },
    {
        field: 'ProductPrice',
        headerName: 'Product Price',
        type: 'number',
        flex: 1,
        headerClassName: 'table-header',
        headerAlign: 'center',
        cellClassName: "!justify-center"
    },

];


const OrignalArray = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 34 },
    { id: 6, lastName: 'Melisandre', firstName: "Alex", age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 10, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 11, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 12, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 13, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 14, lastName: 'Targaryen', firstName: 'Daenerys', age: 100 },
    { id: 15, lastName: 'Melisandre', firstName: "Adam", age: 150 },
    { id: 16, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 17, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 18, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 19, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 20, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 21, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 22, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 23, lastName: 'Targaryen', firstName: 'Daenerys', age: 100 },
    { id: 24, lastName: 'Melisandre', firstName: "Aden", age: 150 },
    { id: 25, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 26, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 27, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

 



export default function ListingTable() {
    const [ProductsArray, setProductsArray] = React.useState(localStorage.getItem("ProductsData") ? JSON.parse(localStorage.getItem(("ProductsData"))) : []);
    const [rows, setRows] = React.useState(ProductsArray);
    const [searched, setSearched] = React.useState("");
    
    //@info : This function is for generate json to csv file 
    const generateCsv = (rows, columns) => {
        const csvContent =
            columns.map((column) => column.headerName).join(',') +
            '\n' +
            rows.map((row) => columns.map((column) => row[column.field]).join(',')).join('\n');
    
        return new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    }
    
    const CustomToolbar = () => {
        const handleExportClick = () => {
    
            const blob = generateCsv(ProductsArray, columns);
            saveAs(blob, 'exported_data.csv');
        };
        return (
            <Tooltip title="Download file as CSV">
                <button onClick={handleExportClick} style={{ height: "100%", width: "100%", marginLeft: 'auto', backgroundColor: "darkgray", borderRadius: "5px", fontSize: "smaller", padding: "5px", color: "whitesmoke" }}>
                    Export CSV
                </button>
            </Tooltip>
        );
    }


    const requestSearch = (e) => {
        const searchedVal = e.target.value.trimStart();
        if (searchedVal.length < 1) {
            setRows(OrignalArray);
            setSearched("");
        }
        setSearched(searchedVal)
        const filteredRows = OrignalArray.filter((row) => {
            return (row.firstName.toLowerCase().includes(searchedVal.toLowerCase()) || row.lastName.toLowerCase().includes(searchedVal.toLowerCase()));
        });
        setRows(filteredRows);
    };


    return (<div className='h-full  w-full flex flex-col justify-between '>

        <div className='table-dimension'>
            <div className='w-full flex justify-end items-center gap-5 mb-2'>
                <div className='flex items-center justify-end  w-1/4 h-10 border #f9fafb border-gray-300  rounded-lg '>
                    <div className='flex items-center h-full w-11/12'><input type='text' className=' w-full h-full flex justify-start items-center rounded-lg pl-2 #f9fafb focus-within:outline-none' value={searched} placeholder='Search here...' onChange={requestSearch} /></div>
                    <div className='h-full p-1 w-1/12 flex items-center #f9fafb '>
                        <SearchIcon style={{ color: "black", height: "100%", width: "100%",opacity:"55%" }} />
                    </div>
                </div>
                <div className='h-full'><CustomToolbar /></div>
            </div>
            <div style={{ height: "100%", width: "100%" }}>
                <DataGrid
                    rows={rows}
                    getRowId={(row) => row.ID}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        }
                    }
                    }
                    options={{
                        exportButton:true,
                        exportAllData: true
                    }}
                    pageSizeOptions={[5, 10]}

                />
            </div>
        </div>
    </div>
    );
}
