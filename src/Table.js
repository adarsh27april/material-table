import React, { useState, useEffect } from 'react'
import { data } from './data';
import { DataGrid } from '@mui/x-data-grid';

const url = 'http://localhost:8430/find';

const Table = () => {

    const [Err, setErr] = useState(null)
    const [Rows, setRows] = useState([]);

    const columns = [
        //firstName, lastName, cgpa, id, year 
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        { field: 'cgpa', headerName: 'CGPA', width: 100 },
        { field: 'year', headerName: 'Year', width: 100 },
    ];

    useEffect(() => {
        fetch(url, { method: "POST", body: {} })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                setRows(data.data);
            })
            .catch((err) => { console.log("err", err) })
    }, [])

    console.log("Rows: ", Rows);

    return (
        <>
            <div style={{ height: 350, width: '60%' }}>
                <DataGrid
                    rows={Rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    options={{
                        search: true
                    }}
                // checkboxSelection
                />
            </div>

        </>
    )
}

export default Table;
