import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/admin/sidebar/Sidebar';

import "./list.scss"
import Datatable from '../../../components/admin/datatable/Datatable';


import { useLocation, useNavigate } from 'react-router-dom';

import { request, gql } from 'graphql-request'; // Import necessary functions and objects

import backEndGraphQLURL from '../../../utility/http';

import Navbar from '../../../components/Navbar/Navbar'
import Announcement from '../../../components/announcements/Announcement'
import Footer from '../../../components/footer/Footer'
import { Add, Remove } from '@mui/icons-material'

import { useAuth } from "../../../utility/context/auth";
import { useCart } from "../../../utility/context/cart";
import { useTable } from "../../../utility/context/table";


import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
// import { rows } from '../../../dataTableSource';

import { Link } from "react-router-dom";

import EditIcon from '@mui/icons-material/Edit';
import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined';
// import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import PreviewIcon from '@mui/icons-material/Preview';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { Delete } from '@mui/icons-material';
import Fun from './FRow';


export default function ListAdmin() {

  const { isAuthenticated, setAuthenticated, login, setToken, user } = useAuth();
  const { cartItems, setCartItems, addOrder, findCartItems, cancelCartItem, updateCartItemQuantity } = useCart();

  // const {  
  //   rows,
  //   setRows,
  //   dotWalkField,
  //   setDotWalkField,
  //   headers,
  //   addRows, 
  //   setHeaders
  //  } = useTable();

   const [headers, setHeaders] = useState([]);

   const [rows, setRows] = useState([]);

  const navigate = useNavigate();

  const location = useLocation();
  const listType = location.pathname.split("/")[2]

  // const [headers, setHeaders] = useState([]);
  const [refetcher, setRefetcher] = useState(false);
  const [customRows, setCustomRows] = useState([]);

  async function deleteUser(id) {
    try {
      const deleteUserMutation = gql`
        mutation deleteUser($id: Int!) {
          deleteUser(id: $id) {
            id
          }
        }
      `;
      const variables = { id: parseInt(id) };
      let responseLogin = await request(backEndGraphQLURL, deleteUserMutation, variables);

      setRefetcher(true);
    }
    catch (err) {
      console.log(err.message);
    }
  }


  async function deleteProduct(id) {


    try {
      console.log({ deleteProductId: id });

      const deleteProductMutation = gql`
        mutation deleteProduct($id: Int!) {
          deleteProduct(id: $id) {
            id
          }
        }
      `;
      const variables = { id: parseInt(id) };
      let responseLogin = await request(backEndGraphQLURL, deleteProductMutation, variables);
      console.log({ responseLogin });

      setRefetcher(true);
    }
    catch (err) {
      console.log(err.message);
    }
  }

  // const [rows, setRows] = useState([]);

  useEffect(() => {
    console.log("test 112233");

    const fetchData = async () => {
      // console.log({listType});

      try {

        let query = null;
        let variables = null;
        let dotWalkField = null;
        let response = null;

        if (listType == "users") {

          query = gql`
                {
                  users{
                    id,
                    firstName,
                    lastName,
                    email
                  }
                }
              `
          dotWalkField = "users";

          response = await request(backEndGraphQLURL, query);

          let customRw = [];
          
          response[dotWalkField].map((row, id) => {
            let arr = {
              id: row.id,
              visibility: false,
              content: [
                {
                  name: "id",
                  value: row.id,
                },
                {
                  name: "email",
                  value: row.email,
                },
                {
                  name: "firstName",
                  value: row.firstName,
                },
                {
                  name: "lastName",
                  value: row.lastName,
                },
              ],
            };
            customRw.push(arr);
          });
          
          setRows(customRw);

        }

        if (listType == "products") {
          // setHeaders([
          //   {
          //     field: 'id',
          //     numeric: true,
          //     headerName: "Id",

          //   },
          //   {
          //     field: 'name',
          //     numeric: false,
          //     disablePadding: false,
          //     headerName: 'Name',

          //   },
          //   {
          //     field: 'desc',
          //     numeric: false,
          //     disablePadding: false,
          //     headerName: 'Description',
          //   },
          //   {
          //     field: 'brand',
          //     numeric: false,
          //     disablePadding: false,
          //     width: 250,
          //     label: 'Brand',
          //   },
          //   {
          //     field: "action",
          //     headerName: "Action",
          //     width: 200,
          //     renderCell: (params) => {
          //       return (<div className="cellAction">
          //         <Link to={`/adminPanel/products/${params.row.id}`} style={{ textDecoration: "none" }}>
          //           {/* <Link to={`/adminPanel/${listType}/${params.row.id}`} style={{textDecoration: "none"}}> */}

          //           <div className="viewButton">
          //             View
          //           </div>
          //         </Link>
          //         <div className="deleteButton" onClick={(e) => {
          //           deleteProduct(params.row.id)
          //         }}>
          //           Delete
          //         </div>
          //       </div>)
          //     }
          //   }
          // ])
          let selectedFilter = {};
          let category = "";

          query = gql`
              query products($category: String!, $selectedFilter: ProductFilterInput!) {
                  products(category: $category, selectedFilter: $selectedFilter) {
                         id, 
                         name, 
                         desc,
                         brand,
                         price,
                         category{
                          id, 
                          name
                         },
                         variation{
                              id,
                              img, 
                              color,
                              size
                          }
              }}
            `;
          variables = { category, selectedFilter }; // Define your variable object
          dotWalkField = "products";
          response = await request(backEndGraphQLURL, query, variables);
          console.log({response});
    
          // let newResponse = response[dotWalkField].map((obj) => {
          //   obj.id = parseInt(obj.id);
          //   return obj
          //   // console.log({obj});
          // })
          // //  console.log({newResponse});
          // setRows(newResponse);

          let customRw = [];
          
          response[dotWalkField].map((row, id) => {
            let arr = {
              id: row.id,
              visibility: false,
              content: [
                {
                  name: "id",
                  value: row.id,
                },
                {
                  name: "name",
                  value: row.name,
                },
                {
                  name: "desc",
                  value: row.desc,
                },
                {
                  name: "price",
                  value: row.price,
                },
                {
                  name: "category",
                  value: row.category.name,
                },
              ],
            };
            customRw.push(arr);
          });
          
          console.log({customRw});

          setRows(customRw);
        }

      }
      catch (err) {
        console.log(err.message);
      }

    }

    fetchData();

  }, [])

useEffect(()=>{
  
  let dynamicHeaders = (rows.length > 0) ? rows[0].content.map( (rw) => {
   
    return {
      field: rw.name,
      headerName: rw.name,
      width: 230,
      renderCell: (params) => {
       const foundRow = rows.find((row) => row.id == params.row.id);
        const foundField = foundRow.content.find((field) => field.name == params.field);
       return (
          <div className="cellAction" style={{ display: "flex", flexDirection: "column" }}>
            {foundRow.visibility ? null: <div>{foundField.value}</div> }
            {foundRow.visibility ? <input type='text' value={foundField.value} 
            onChange={(e) => {
               handleChange(e.target.value, params.row.id, params.field)
            }} /> : null}
          </div>
        )
      }
  }}) : [];

  setHeaders([
    ...dynamicHeaders,
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (<div className="cellAction">
          {/* <Link to={`/adminPanel/${listType}/${params.row.id}`} style={{textDecoration: "none"}}> */}
          {
            (!params.row.visibility) ? 
            <><Link to={`/adminPanel/users/${params.row.id}`} style={{ textDecoration: "none" }}>
            <div style={{
              // color: "red",
              cursor: "pointer"
            }}>
              <VisibilityIcon />
            </div>
          </Link>
          <div style={{
            // color: "red",
            cursor: "pointer"
          }} onClick={(e) => {

            handleVisibility("edit", params.row.id);
            
          }}>

            <EditIcon />
          </div>
          <div onClick={(e) => {
            deleteUser(params.row.id)
          }} style={{
            color: "red",
            cursor: "pointer"
          }}>
            <Delete />
          </div></> : <>
          <div style={{
            // color: "red",
            cursor: "pointer"
          }} onClick={(e) => {
            handleVisibility("cancel", params.row.id);
          }}>
            <CancelOutlinedIcon />
          </div>
          <div onClick={(e) => {
            handleVisibility("update", params.row.id);

          }} style={{
            color: "red",
            cursor: "pointer"
          }}>
                <BeenhereOutlinedIcon />
          </div></> 
          }
        </div>)
      }
    }

  ])

}, [rows])



  const handleVisibility = (action, rowId)=>{
    try{
      let previousRowsState = [...rows];
      let newArr = [...rows];
      let changed;
      if(action == "update"){
        changed = newArr.map( (rw)=>{
          console.log({rw});
          if(rw.id === rowId){
            rw.visibility = false;
          }
          return rw
        } )
      }
      if(action == "cancel"){
        changed = previousRowsState;
      } 
      if(action == "edit"){
        changed = newArr.map( (rw)=>{
          console.log({rw});
          if(rw.id === rowId){
            rw.visibility = true;
          }
          return rw
        } )
      } 
      setRows(changed);
    }
    catch(err){
      console.log(err);
    }
  }

  const handleChange = (e, rowId, fieldName) => {
    // Create a shallow copy of the rows state
    const newRows = [...rows];
  
    let changed = newRows.map((rw) => {

      if(rw.id === rowId) {
        rw.content = rw.content.map((fld) => {
          if(fld.name === fieldName) {
            fld.value = e;
          }
          return fld;
        })
      }
      return rw;
    });



    // console.log({changed});
    // Find the row in the copied state
    setRows(changed);
    // const foundRow = newRows.find((row) => row.id === rowId);
  
    // // Find the exact field in the row and update its value
    // const foundField = foundRow.content.find((field) => field.name === fieldName);
    // Object.defineProperty(foundField, 'myProperty', {
    //   value: 'initialValue',   // Initial value
    //   writable: true,           // Allow the property to be written (changed)
    //   enumerable: true,         // Allow the property to be enumerated
    //   configurable: true        // Allow the property to be redefined or deleted
    // });
    // foundField.value = e.target.value;
  
    // Set the state with the updated rows
    // setRows(newRows);
  };

  

  return (


    <div className='list'>
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable headers={headers} rows={rows} title={listType}
        //  getRowId={(rows) => rows.find((field) =>  )}
          />
      </div>
    </div>
  );
}
