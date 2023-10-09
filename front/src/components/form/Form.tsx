import React, {useState, useEffect} from "react";


import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddIcon from '@mui/icons-material/Add';

import "./form.scss";


const inputElement = [
  {
    id: 1,
    label: "Product name",
    type: "text",
    placeholder: "product name",
    validationMethod: ()=>{

    }

  },
  {
    id: 2,
    label: "quantity",
    type: "number",
    placeholder: "quantity",
    validationMethod: ()=>{
      
    }
  },
  {
    age: 3,
    label: "color",
    type: "text",
    placeholder: "color",
    validationMethod: ()=>{
      
    }
  },
  {
    id: 4,
    label: "total",
    type: "number",
    placeholder: "total",
    validationMethod: ()=>{
      
    }
  }
]

const titl = "Add To Cart";

const columnSize = 3;



export default function Form({   
  title,
  columnSize,
  inputElements,
  onSubmitMethods,
}: {  
  title: any,
  columnSize: any,
  inputElements: any,
  onSubmitMethods: any,
 } ) {



  const [inputFields, setFields] = useState(inputElements);

  const updateObjectByname = (name: any, newValue: any) => {
    setFields((prevData: any) => {
      const updatedFields = prevData.map((item: any) => {
        if (item.name === name) {
          return { ...item, value: newValue };
        } else {
          return item;
        }
      });

      return updatedFields;
    });
  };

  const handleOnSubmit = (event: any) => {
    event.preventDefault();
    alert(inputFields);
    onSubmitMethods(inputFields);
  };

    return (
      <div>
      <div className="container">
        <div className="formContainer">
          <div className="top">
            {/* <div className="title">{title}</div> */}
            {/* <ChevronLeftIcon  sx={{
              fontWeight: '1000',
            }} className="backIcon"/> */}
            {/* <div> */}
                <AddIcon sx={{
                  border: "2px solid white"
                }} className="submitIcon" />
                {/* <button className="submitButton" type="submit">Submit</button> */}
            {/* </div> */}
             {/* <h3>{inputFields[1].value}</h3> */}
          </div>
          <div className="center">
            <form
              onSubmit={handleOnSubmit}
              
            >
              <div className="formInputContainer" style={{ gridTemplateColumns: `repeat(${columnSize}, 1fr)` }}>
                {inputFields.map((input: any) => {
                  return (
                    <div className="formInput" key={input.id}>
                      <label>{input.label}</label>
                      <input
                        onChange={(e: any) => {
                          updateObjectByname(input.name, e.target.value);
                        }}
                        type={input.type}
                      />
                    </div>
                  );
                })}
              </div>

              {/* <div className="button"> */}
              
              {/* </div> */}
            </form>
          </div>
      
        </div>
      </div>
    </div>
  );
}
