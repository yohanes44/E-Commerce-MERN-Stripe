import React, {useState, useEffect} from 'react';
import Sidebar from '../../../components/admin/sidebar/Sidebar';
import Navbar from '../../../components/admin/navbar/Navbar';

import "./single.scss"

import userImage from "./myPic.jpg"
import Chart from '../../../components/chart/Chart';
import List from "../../../components/admin/table/Table"


import { useLocation, useNavigate } from 'react-router-dom';


import { request, gql } from 'graphql-request'; // Import necessary functions and objects

import  backEndGraphQLURL from '../../../utility/http';



function Single() {

    const location = useLocation();
    const userId = parseInt(location.pathname.split("/")[3]);

    const [error, setError] = useState(null);

    const [rows, setRows] = useState([]);

    const [user, setUser] = useState({
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        img: null,
        roles: [],
        address: {
            phoneNumber: null,
            city: null,
            sub_city: null
        }
    });

    const [refetcher, setRefetcher] = useState(false);
    const [orderedCarts, setOrderedCarts] = useState([]);

    const [transactions, setTransactions] = useState([]);

    async function deleteOrderItem(id){
        try{

            console.log({id});
            let query = gql`
            mutation deleteProductVariation($id: Int!) {
                deleteProductVariation(id: $id) {
                    id,
            }}
          `;

           let variables = { id: parseInt(id) }; // Define your variable object
            let response = await request(backEndGraphQLURL, query, variables);
            setRefetcher(true);
        }
        catch(err){
            console.log(err.message);
        }
    }


useEffect( ()=>{

    let fetchData = async () => {
            try{

                let  query = null;
                let variables = null;
                let dotWalkField = null;

                    query = gql`
                    query user($id: Int!) {
                        user(id: $id) {
                            id,
                            firstName,
                            lastName,
                            email,
                            img,
                            password,
                            roles{
                              id,
                              name
                            },
                            address{
                              phoneNumber,
                              city,
                              sub_city
                            }

                    }}
                  `;

                   variables = { id: userId }; // Define your variable object
                   dotWalkField = "user";
                   let userResponse =   await request(backEndGraphQLURL, query, variables);
                console.log({userResponse});
                   setUser(userResponse[dotWalkField]);


                   let cartQuery = gql`
                   query orderedCartItems($userId: Int!) {
                    orderedCartItems(userId: $userId) {
                        id,
                        orderId,
                        state,
                        quantity,
                        product{
                         id,
                         name,
                         brand,
                         img,
                         price,
                         category{
                           id,
                           name
                         }
                       },
                        variation{
                         id,
                         color,
                         size,
                         img,
                         quantity
                       },
                   
                        order{
                            userId,
                            state,
                            total,
                            date
                          }
        
                   }}
                 `;


             

                 let cartResponse =   await request(backEndGraphQLURL, cartQuery, {userId});
                 
                 console.log({cartResponse});

                let rws = [];

                 cartResponse.orderedCartItems.map( (cartItem) => {
                    rws.push({
                        "id": cartItem.id,
                        // "product": `${cartItem.product.img} ${cartItem.product.brand} ${cartItem.product.name}`,
                        "img": `${cartItem.product.img} - ${cartItem.product.brand} - ${cartItem.product.name}`,
                        "variation": `${cartItem.variation.color}-${cartItem.variation.size}`,
                        "orderId": cartItem.orderId,
                        "state": cartItem.state,
                        "quantity": cartItem.quantity,
                        "date": cartItem.order.date,
                    });
                })

                 setOrderedCarts(cartResponse.orderedCartItems);
                 setRows(rws);

                
            }
            catch(err){
                setError(err.message.split("።")[0]);
                console.log(err.message);
            }
        }

        fetchData();
}, [userId, refetcher] )


// console.log({user})
   
  let columns = [
    "Id",
    "Product",
    "Variation",
    "OrderId",
    "State",
    "Quantity",
    "Date"
  ];


return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />

                {
                    error ? <div style={{
                        // border: "2px solid red",
                        textAlign: "center",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        color: "red",
                        padding: "200px",
                        fontWeight: "bold",
                        fontSize: "25px"
                    }}> {error} </div> : <>
                         <div className="top">
                    <div className="left">
                        <div className="editButton">Edit</div>
                        <h1 className="title">information</h1>
                        <div className="item">
                            <img src={user.img || "http://localhost:3005/api/image/category/person.jpg"} alt="" className="itemImg" />
                            <div className="details">
                                <h1 className="itemTitle">{user.firstName + " " +  user.lastName} </h1>
                                <div className="detailItem">
                                    <span className="itemKey">Email: {user.email}</span>
                                    <span className="itemValue"></span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Phone: </span>
                                    <span className="itemValue">{ user.address.phoneNumber}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Address: </span>
                                    <span className="itemValue">{ user.address.city + " " + user.address.sub_city}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <Chart 
                            data={
                                [
                                    {name: "January", Total: 100},
                                    {name: "February", Total: 1200},
                                    {name: "March", Total: 500},
                                    {name: "April", Total: 800},
                                    {name: "May", Total: 600},
                                    {name: "June", Total: 400}
                                ]
                                }     
                            aspect={3/1} 
                            title="User transaction for last 6 months" />
                    </div>
                </div>
                <div className="bottom">
                    <h1 className="title">Orders</h1>
                    <List columns={columns} rows={rows}  page="orders"/>
                </div>
                    </>
                }

               
            </div>
        </div>
    );
}

export default Single;