
import myPic from "../src/images/category/shirt2.jpg"

const numOfColumns = 10;

// {
//   field: "action", 
//   headerName: "Action", 
//   width: 200,
//   renderCell: ()=>{
//   return (<div className="cellAction">
//     <Link to="/adminPanel/users/test" style={{textDecoration: "none"}}>
//     <div className="viewButton">
//       View
//     </div>
//     </Link>
//     <div className="deleteButton">
//       Delete
//     </div>
//   </div>)
// } }

export const headCells = [
    {
        field: 'id',
        headerName: "Id", 
        width: 200,
      //   renderCell: ()=>{
      //       return (<div className="cellAction">
              
      //         <div className="deleteButton">
      //           Delete
      //         </div>
      //       </div>)
      //  }
    },
    {
        field: 'firstName',
        numeric: true,
        disablePadding: false,
        headerName: 'First Name',
       
      },
      {
        field: 'lastName',
        numeric: true,
        disablePadding: false,
        label: 'Last Name',
      },
      {
        field: 'email',
        numeric: true,
        disablePadding: false,
        label: 'Email',
      },
      // {
      //   field: 'protein',
      //   numeric: true,
      //   disablePadding: false,
      //   label: 'Protein (g)',
      // },
  
]
 
export const rows = [
    {
        id: 1,
        name: "john" ,
        calories: 24,
        fat: 23,
        carbs: 43,
        protein: 65,
      },
      {
        id: 2,
        name: "Samy" ,
        calories: 24,
        fat: 23,
        carbs: 43,
        protein: 65,
      },
      {
        id: 3,
        name: "Elias" ,
        calories: 24,
        fat: 23,
        carbs: 43,
        protein: 65,
      },
      {
        id: 4,
        name: "Debe" ,
        calories: 24,
        fat: 23,
        carbs: 43,
        protein: 65,
      },
      {
        id: 5,
        name: "Gemechu" ,
        calories: 24,
        fat: 23,
        carbs: 43,
        protein: 65,
      },
      {
        id: 6,
        name: "Hundessa" ,
        calories: 24,
        fat: 23,
        carbs: 43,
        protein: 65,
      }, 
      {
        id: 7,
        name: "john" ,
        calories: 24,
        fat: 23,
        carbs: 43,
        protein: 65,
      },
      {
        id: 8,
        name: "Samy" ,
        calories: 24,
        fat: 23,
        carbs: 43,
        protein: 65,
      },
      {
        id: 9,
        name: "Elias" ,
        calories: 24,
        fat: 23,
        carbs: 43,
        protein: 65,
      },
      {
        id: 10,
        name: "Debe" ,
        calories: 24,
        fat: 23,
        carbs: 43,
        protein: 65,
      },
      {
        id: 11,
        name: "Gemechu" ,
        calories: 24,
        fat: 23,
        carbs: 43,
        protein: 65,
      },
    ]


export const inputElements = [
  {
    id: 1,
    label: "First Name",
    type: "text",
    placeholder: "first name",
    validationMethod: ()=>{

    }

  },
  {
    id: 2,
    label: "Last Name",
    type: "text",
    placeholder: "last name",
    validationMethod: ()=>{
      
    }
  },
  {
    age: 3,
    label: "Age",
    type: "number",
    placeholder: "age",
    validationMethod: ()=>{
      
    }
  },
  {
    id: 4,
    label: "Email",
    type: "email",
    placeholder: "test@g,ail.com",
    validationMethod: ()=>{
      
    }
  },
  {
    id: 5,
    label: "Marita status",
    type: "email",
    placeholder: "test@g,ail.com",
    validationMethod: ()=>{
      
    }
  },
  {
    id: 1,
    label: "First Name",
    type: "text",
    placeholder: "first name",
    validationMethod: ()=>{

    }

  },
  {
    id: 2,
    label: "Last Name",
    type: "text",
    placeholder: "last name",
    validationMethod: ()=>{
      
    }
  },
  {
    age: 3,
    label: "Age",
    type: "number",
    placeholder: "age",
    validationMethod: ()=>{
      
    }
  },
  {
    id: 4,
    label: "Email",
    type: "email",
    placeholder: "test@g,ail.com",
    validationMethod: ()=>{
      
    }
  },
  {
    id: 5,
    label: "Marita status",
    type: "email",
    placeholder: "test@g,ail.com",
    validationMethod: ()=>{
      
    }
  },
  {
    id: 2,
    label: "Last Name",
    type: "text",
    placeholder: "last name",
    validationMethod: ()=>{
      
    }
  },
  {
    age: 3,
    label: "Age",
    type: "number",
    placeholder: "age",
    validationMethod: ()=>{
      
    }
  },
  {
    id: 4,
    label: "Email",
    type: "email",
    placeholder: "test@g,ail.com",
    validationMethod: ()=>{
      
    }
  },
  {
    id: 5,
    label: "Marita status",
    type: "email",
    placeholder: "test@g,ail.com",
    validationMethod: ()=>{
      
    }
  },
  {
    id: 1,
    label: "First Name",
    type: "text",
    placeholder: "first name",
    validationMethod: ()=>{

    }

  },
  {
    id: 2,
    label: "Last Name",
    type: "text",
    placeholder: "last name",
    validationMethod: ()=>{
      
    }
  },
  {
    age: 3,
    label: "Age",
    type: "number",
    placeholder: "age",
    validationMethod: ()=>{
      
    }
  },
]