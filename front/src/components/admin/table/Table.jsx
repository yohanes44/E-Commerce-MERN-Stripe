import React, { useEffect, useState } from 'react';

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


import EditIcon from '@mui/icons-material/Edit';
import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined';
  import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import PreviewIcon from '@mui/icons-material/Preview';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { Delete } from '@mui/icons-material'
import { useGraphQL } from "../../../utility/context/graphQL";

function List( {columns, rows, page} ) {
  
  const [rowsLocal, setRowsLocal] = useState([]);
   

  const { updateRecord, deleteRecord } = useGraphQL();

   if(rows.length === 0){
      return null;
   }

   const keys = Object.keys(rows[0]);

   const updateUser = async (row)=>{
      try{

        let updated =  await updateRecord("orders", row)
          
      }
      catch(err){
        console.log(err);
      }
  }


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
                     return  false ? <TableCell className='tableCell'> {row[key]}</TableCell>: <TableCell className='tableCell'> <input type='text' value={row[key]} /></TableCell>

                     
                    }
                    } )
                }


                <TableCell className='tableCell'> 
          
          
                <div className="cellAction">
          
          {
            true ?  <div className='topAction' style={{display: "flex"}}>
            <Link to={`/adminPanel/`} style={{ textDecoration: "none" }}>
              <div style={{
                // color: "red",
                cursor: "pointer"
              }}>
                <VisibilityIcon />
              </div>
            </Link>

          <div style={{
            cursor: "pointer"
          }} onClick={(e) => {

          }}>

            <EditIcon />
          </div>


          <div onClick={(e) => {
          }} style={{
            color: "red",
            cursor: "pointer"
          }}>
            <Delete />
          </div>
          </div> : null
          }      
         
          
          {
            false ? <div className='bottomAction'  style={{display: "flex"}}>
            <div style={{
              // color: "red",
              cursor: "pointer"
            }} onClick={(e) => {
            }}>
              <CancelOutlinedIcon />
            </div>
            <div onClick={(e) => {
  
            }} style={{
              color: "red",
              cursor: "pointer"
            }}>
                  <BeenhereOutlinedIcon />
            </div>
            </div>: null
          }
          


        </div>
        <button type='button' onClick={(e) => {
            updateUser(row); 
        }}>Save</button>
                </TableCell>
                   
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}

export default List;