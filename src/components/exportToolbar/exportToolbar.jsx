import * as React from 'react';
import {GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';


const CustomToolbar = ()=>{
  return (
    <GridToolbarContainer>
        <GridToolbarExport />
    </GridToolbarContainer>
  );
}


const Mydata=[
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
export const  ExportCustomToolbar = ()=>{
  // const { data, loading } =  useDemoData({
  //   dataSet: 'Employee',
  //   rowLength: 4,
  //   maxColumns: 6,
  // });
  const loading = false;

  return (
    <div style={{ height: 300, width: '100%' }}>
      {/* <DataGrid
       rows={Mydata}
       columns={[{ field: 'id', headerName: 'ID', width: 70 },
       { field: 'lastName', headerName: 'Last Name', width: 130 },
       { field: 'firstName', headerName: 'First Name', width: 130 },
       { field: 'age', headerName: 'Age', type: 'number', width: 90 },
]}
        loading={loading}
        slots={{
          toolbar: CustomToolbar,
        }}
      /> */}
    </div>
  );
}
