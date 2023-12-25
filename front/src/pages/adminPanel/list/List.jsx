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
   const [rowsBackUp, setRowsBackUp] = useState([]);


  const navigate = useNavigate();

  const location = useLocation();
  

  // const [headers, setHeaders] = useState([]);
  const [refetcher, setRefetcher] = useState(false);
  const [customRows, setCustomRows] = useState([]);

  let listType = location.pathname.split("/")[2];
  


  useEffect(() => {


    // alert("listType == "+ listType);

    const fetchData = async () => {
      try {

    

        if (listType == "users") {

          let query = gql`
                {
                  users{
                    id,
                    firstName,
                    lastName,
                    email
                  }
                }
              `
          let dotWalkField = "users";

          let response = await request(backEndGraphQLURL, query);

          let customRw = [];
          
          response[dotWalkField].map((row, id) => {
            let arr = {
              id: row.id,
              visibility: false,
              content: [
                {
                  name: "id",
                  value: row.id,
                  editable: false
                },
                {
                  name: "email",
                  value: row.email,
                  editable: true
                },
                {
                  name: "firstName",
                  value: row.firstName,
                  editable: true
                },
                {
                  name: "lastName",
                  value: row.lastName,
                  editable: true
                },
              ],
            };

            customRw.push(arr);
          });
          
          setRows(customRw);

        }

        if (listType == "products") {
          let selectedFilter = {};
          let category = "";

          let query = gql`
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
          let variables = { category, selectedFilter }; // Define your variable object
          let dotWalkField = "products";
          let response = await request(backEndGraphQLURL, query, variables);
  
          let customRw = [];
          
          response[dotWalkField].map((row, id) => {
            let arr = {
              id: row.id,
              visibility: false,
              content: [
                {
                  name: "id",
                  value: row.id,
                  editable: false
                },
                {
                  name: "name",
                  value: row.name,
                  editable: true
                },
                {
                  name: "desc",
                  value: row.desc,
                  editable: true

                },
                {
                  name: "price",
                  value: row.price,
                  editable: true
                },
                {
                  name: "category",
                  value: row.category.name,
                  editable: false
                },
              ],
            };
            customRw.push(arr);
          });
          
    

          setRows(customRw);
        
        }

      }
      catch (err) {
        console.log(err);
      }

    }

    fetchData();

  }, [listType])

 


useEffect(()=>{
  
  let dynamicHeaders = (rows.length > 0) ? rows[0].content.map( (rw) => {
    
    return {
      field: rw.name,
      headerName: rw.name,
      width: 230,
      renderCell: (params) => {

       const foundRow = rows.find((row) => row.id == params.row.id);

       const foundField = foundRow?.content.find((field) => field.name == params.field);

       return (
          <div className="cellAction" style={{ display: "flex", flexDirection: "column" }}>
            {foundRow?.visibility ? null: <div>{foundField?.value}</div> }
            {foundRow?.visibility ? <input type='text' value={foundField?.value} disabled={!foundField?.editable} 
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
            <><Link to={`/adminPanel/${listType}/${params.row.id}`} style={{ textDecoration: "none" }}>
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

  const fetchOriginal = async ()=>{
    try{
      let selectedFilter = {};
      let category = "";

      let query = gql`
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
        let variables = { category, selectedFilter }; // Define your variable object
        let dotWalkField = "products";
        let response = await request(backEndGraphQLURL, query, variables);
  

      let customRw = [];
      
      response[dotWalkField].map((row, id) => {
        let arr = {
          id: row.id,
          visibility: false,
          content: [
            {
              name: "id",
              value: row.id,
              editable: false
            },
            {
              name: "name",
              value: row.name,
              editable: true
            },
            {
              name: "desc",
              value: row.desc,
              editable: true
            },
            {
              name: "price",
              value: row.price,
              editable: true
            },
            {
              name: "category",
              value: row.category.name,
              editable: false
            },
          ],
        };
        customRw.push(arr);
      });
      

      // setRows(customRw);
      // setRowsBackUp(customRw);

      return customRw;
    }
    catch(err){
      console.log(err);
    }
  }

  const updateRow = async (type, rowId, rowContent) => {
    rowId = parseInt(rowId);
    try{

      if(type == "users"){
        let input = {};


        input.firstName = rowContent.firstName;
        input.lastName = rowContent.lastName;
        input.email = rowContent.email;

        const updateUserMutation = gql`
         mutation updateUser($id: Int!, $input: UserInput) {
          updateUser(id: $id, input: $input
          ) {
            firstName,
            lastName,
            email 
        }
      }
    `;

      const variables = { id: parseInt(rowId), input};

      

      let responseLogin =  await request(backEndGraphQLURL,updateUserMutation,variables);

       return responseLogin;
      }
      if(type == "products"){
        let input = {};
        input.name = rowContent.name;
        input.desc = rowContent.desc;
        input.brand = rowContent.brand;
        input.price = parseInt(rowContent.price);

        const updateProductMutation = gql`
         mutation updateProduct($id: Int!, $input: ProductInputType) {
          updateProduct(id: $id, input: $input
          ) {
              name,
              desc,
              price 
        }
      }
    `;

      const variables = { id: parseInt(rowId), input};



      let responseLogin =  await request(backEndGraphQLURL,updateProductMutation,variables);

       return responseLogin;
      }
      if(type == "order"){

      }

      
    }
    catch(err){
      console.log(err);
    }
  }


  const handleVisibility = async (action, rowId)=>{
    try{
      let previousRowsState = [...rows];
      let newArr = [...rows];
      let changed;
      if(action == "update"){

        let inputs = {};
        
        changed = newArr.map( (rw)=>{
          if(rw.id === rowId){
            
            let updatedRw = rw.content.map((re) => {
              inputs[re.name] = re.value;
            });
              rw.visibility = false;
          }
        
          return rw
        } )

        let up = await updateRow(listType, inputs.id, inputs);

        setRows(changed);
      }
      if(action == "cancel"){        
        setRows(await fetchOriginal());
      } 
      if(action == "edit"){
        changed = newArr.map( (rw)=>{

          if(rw.id === rowId){
            rw.visibility = true;
          }
          return rw
        } )
        setRows(changed);
      } 
      
    }
    catch(err){
      console.log(err);
    }
  }
 
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
      console.log(err);
    }
  }


  async function deleteProduct(id) {


    try {

      const deleteProductMutation = gql`
        mutation deleteProduct($id: Int!) {
          deleteProduct(id: $id) {
            id
          }
        }
      `;
      const variables = { id: parseInt(id) };
      let responseLogin = await request(backEndGraphQLURL, deleteProductMutation, variables);
 
      setRefetcher(true);
    }
    catch (err) {
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

    setRows(changed);

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
