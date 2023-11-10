import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import "./table.scss"
import myPic from './myPic.jpg';
import {
  Link
} from "react-router-dom"


function List( {columns, rows, page} ) {

   if(rows.length === 0){
      return null;
   }

   const keys = Object.keys(rows[0]);



    return (
        <TableContainer component={Paper} className='table'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {
                columns.map( (col) => {
                  return <TableCell className='tableCell'>{col}</TableCell>
                } )
              }
       
              {/* <TableCell className='tableCell'>Product</TableCell>
              <TableCell className='tableCell'>Product Variation</TableCell>
              <TableCell className='tableCell'>Quantity</TableCell>
              <TableCell className='tableCell'>Status</TableCell>
              <TableCell className='tableCell'>Payment method</TableCell> */}
              <TableCell className='tableCell'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>


            {rows.map((row, index) => (
              <TableRow key={index}>
                {
                  keys.map( (key)=>{

                    if(key == "img"){
                      return   <TableCell className='tableCell'>
                      <div className="cellWrapper">
                          {/* <span>{row[key].split(" - ")[0]}</span> */}
                          <img src={row[key].split(" - ")[0]} alt="" className="image" />
                          {row[key].split("-")[1] + row[key].split("-")[2]}
                      </div>
                  </TableCell>
                    }else{
                     return <TableCell className='tableCell'> {row[key]}</TableCell>
                    }
                    } )
                }
                   <TableCell className='tableCell'>
                    <div style={{
                      display: "flex",
                      gap: "5%"
                    }}>
                        <button style={{
                          border: "none",
                          color: "green",
                          cursor: "pointer"
                        }}> <Link to={`/adminPanel/${page}/${row.id}`}>View</Link></button>
                        <button style={{
                          border: "none",
                          color: "red",
                          cursor: "pointer"
                        }}><Link to={`/adminPanel/${page}/${row.id}`}>Delete</Link></button>
                    </div>
                </TableCell> 
              
                
                {/* <TableCell className='tableCell'>
                    <div className="cellWrapper">
                        <img src={row.img} alt="" className="image" />
                        {row.product}
                    </div>
                </TableCell>
                */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}

export default List;