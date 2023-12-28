
import react, {createContext, useContext, useState, useEffect} from "react";

import { request, gql } from "graphql-request";
import backEndGraphQLURL from "../../utility/http";

const GraphQLContext = createContext();


export const useGraphQL = () => {
    return useContext(GraphQLContext);
}


export const updateRecord = async (type, row) => {
    try{
      
     if(type == "users"){
        let input = {};
        input.firstName = row.firstName;
        input.lastName = row.lastName;
        input.email = row.email;
            const updateUserMutation = gql`
                mutation updateUser($id: Int!, $input: UserInput) {
                    updateUser(id: $id, input: $input
                    ) {
                        firstName,
                        lastName,
                        email 
                    }
                }`;

   //   const variables = { id: parseInt(inputs.id), input: inputs};

     let responseLogin =  await request(backEndGraphQLURL, updateUserMutation, {id: parseInt(input.id), input});
     }

     if(type == "orders"){

        // console.log("update order selected Mannn ");
        // console.log({row});



        let input = {};
        // input.id = row.id;
        // input.quantity = row.quantity;
        // input.state = row.state;
        input.state = "row.state";

            const updateUserMutation = gql`
                mutation updateOrder($id: Int!, $input: OrderInput) {
                    updateOrder(id: $id, input: $input) {
                        id,
                        name,
                        desc,
                        quantity
                    }
                }`;

   //   const variables = { id: parseInt(inputs.id), input: inputs};

     let responseLogin =  await request(backEndGraphQLURL, updateUserMutation,  {id: parseInt(row.orderId), input});
     console.log({responseLogin});

     }
       
    }
    catch(err){
        console.log(err);
    }
}



export const deleteRecord = (query, varriables, table, row) => {
    try{

    }
    catch(err){
        console.log(err);
    }
}


export default function GraphQLProvider({children}){

    // const [darkMode, setDarkMode] = useState(false);



    const ContextValues = {
        updateRecord, deleteRecord
    }
    
    return <GraphQLContext.Provider value={ContextValues}>
        {children}
    </GraphQLContext.Provider>
}



