import React, { useEffect, createContext, useContext, useState } from "react";
import { request, gql } from "graphql-request";
import backEndGraphQLURL from "../../utility/http";
import { useAuth } from "./auth";

const TableContext = createContext();

export const useTable = () => {
  return useContext(TableContext);
};

export default function TableProvider({ children }) {


  const [rows, setRows] = useState([]);
  const [dotWalkField, setDotWalkField] = useState([]);
  const [headers, setHeaders] = useState([]);



  useEffect(() => {
    let fetchData = async () =>{
      
      try{
       

      }
      catch(err){

      }
      

    }

    fetchData();

   
  }, [rows]);


  const addRows = (rws) => {
    try{
        // console.log({contextRow0: rws});
       setRows( (prev) => [...prev, ...rws] ); 
    }
    catch(err){
        console.log(err);
    }
  }

  const contextValue = {
    rows,
    setRows,
    dotWalkField,
    setDotWalkField,
    headers, 
    setHeaders,
    addRows
  };

  return <TableContext.Provider value={contextValue}>{children}</TableContext.Provider>;
}
