import express from "express";
// import ejs from "ejs";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';


export default class TokenGenerator {
    
    constructor(){

    }

     generate(payload: any, secretId: any){
        const token = jwt.sign(payload, secretId);
        return token;
    }

    verify(token: any, secretId: any){
        const data = jwt.verify(token, secretId);
        return data;
    }
}  