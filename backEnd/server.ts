import express from "express";

import mysql from "mysql";

import {PrismaClient} from "@prisma/client"

const app = express();


async function tester(){
    const prisma = new PrismaClient();
    const users = await prisma.user.findMany();
    console.log(users);
    return users
}


tester()




const port = 3002;

app.listen(port, ()=>{
    console.log(`server listening on port ${port}`);
})