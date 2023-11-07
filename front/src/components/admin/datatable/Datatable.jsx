import { PartyModeSharp } from "@mui/icons-material";
import "./datatable.scss"


import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { Link } from "react-router-dom";

import { useLocation, useNavigate } from 'react-router-dom';



export default function Datatable({headers, rows}) {

  const location = useLocation();
  const listType = location.pathname.split("/")[2]
  


  const actionColumn = [
    {
    field: "action", 
    headerName: "Action", 
    width: 200,
    renderCell: (params)=>{
    return (<div className="cellAction">
      <Link to={`/adminPanel/${listType}/${params.row.id}`} style={{textDecoration: "none"}}>
      <div className="viewButton">
        View
      </div>
      </Link>
      <div className="deleteButton">
        Delete
      </div>
    </div>)
  } }
  ]


  return (
    <div className="dataTable">
       <div className="datatableTitle">
          <div>Add New User</div>
          <Link to="/adminPanel/users/new" className="link">
            <div>Add New</div>
          </Link>
       </div>
         <DataGrid  className="dataGrid" sx={
          {
            width: "fit-content"
          }
         }
        rows={rows}
        columns={headers.concat(actionColumn)}
        // pageSize={5}
        // rowsPerPageOptions={[5]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 9 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  )
}
