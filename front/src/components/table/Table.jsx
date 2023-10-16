import React, {useState, useEffect} from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import "./table.scss"
import myPic from './myPic.jpg';

function List(  ) {

    const rows = [
        {
            id: 1111,
            product: "mac Pc",
            img: myPic,
            customer: "john",
            date: "1march",
            amount: 785,
            method: "Cash on delivery",
            status: "Approved"
        },
        {
            id: 1112,
            product: "Toshiba Pc",
            img: myPic,
            customer: "samy",
            date: "1 jully",
            amount: 785,
            method: "Cash on delivery",
            status: "Pending"
        },
        {
            id: 1111,
            product: "mac Pc",
            img: myPic,
            customer: "john",
            date: "1march",
            amount: 785,
            method: "Cash on delivery",
            status: "Pending"
        },
        {
            id: 1111,
            product: "mac Pc",
            img: myPic,
            customer: "john",
            date: "1march",
            amount: 785,
            method: "Cash on delivery",
            status: "Approved"
        }
    ]
    
    let currentRow = [];

    rows.map( (row)=>{
        const cRow = getValuesFromObject(row);
        currentRow.push(cRow);
    } )

    // let rows4 = Object.keys(rows)
    
    function getValuesFromObject(obj){

        const values = [];

        for(const key in obj){
            values.push(obj[key]);
        }
        return  values;

    }

    console.log({rows, currentRow});
    
    return (
        <TableContainer component={Paper} className='table'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
                {/* {
                    columns.map( (column, i) => {
                        return <TableCell className='tableCell'>{column}</TableCell>
                    })
                } */}
              <TableCell className='tableCell'>Id</TableCell>
              <TableCell className='tableCell'>Product</TableCell>
              <TableCell className='tableCell'>Img</TableCell>

              <TableCell className='tableCell'>Customer</TableCell>
              <TableCell className='tableCell'>Date</TableCell>
              <TableCell className='tableCell'>Amount</TableCell>
              <TableCell className='tableCell'>Payment method</TableCell>
              <TableCell className='tableCell'>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRow.map((row, i) => (
                
              <TableRow key={row.id}> 
                 {
                    row.map( (rw)=> {
                        return <TableCell className='tableCell'>{rw}</TableCell>
                    } )
                 }
                 
                {/* <TableCell className='tableCell'>{row}</TableCell> */}
                
                {/* <TableCell className='tableCell'> {row.id}</TableCell>
                <TableCell className='tableCell'>
                    <div className="cellWrapper">
                        <img src={row.img} alt="" className="image" />
                        {row.product}
                    </div>
                </TableCell>
                <TableCell className='tableCell'>{row.customer}</TableCell>
                <TableCell className='tableCell'>{row.date}</TableCell>
                <TableCell className='tableCell'>{row.amount}</TableCell>
                <TableCell className='tableCell'>{row.method}</TableCell>
                <TableCell className='tableCell'>
                    <span className={`status ${row.status}` }>
                        {row.status}
                    </span>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}

export default List;