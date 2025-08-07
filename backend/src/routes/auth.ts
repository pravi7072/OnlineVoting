import express, { json } from "express"
import { PrismaClient, } from "@prisma/client";
import jwt from "jsonwebtoken"
import zod from "zod";
import cors from "cors";
import dotenv from "dotenv";
const prisma=new PrismaClient()
export const UserRouter=express.Router();
UserRouter.use(express.json())
UserRouter.use(cors())
dotenv.config();
const JWT_SCRT = process.env.JWT_SECRET || "fallbackSecret";
const SignupSchema=zod.object({
    username:zod.string().email(),
    password:zod.string().min(8),
    role:zod.enum(["USER","ADMIN"]).optional()
})
type Schema=zod.infer<typeof SignupSchema>;
UserRouter.post('/register',async(req,res)=>{
    const body:Schema=req.body;
    const {success}=SignupSchema.safeParse(body);
    if(!success){
        res.json({
            msg:"Invalid Body"
        })
        return;
    }
    const {username,password,role}=body;
    if(!username||!password||!role){
        res.json({msg:"Something is missing check your body data"})
        return;
    }
    const user=await prisma.user.create({
        data:{
        username,
        password,
        role
    }})
    if(!user){
        res.json({msg:"Unable to create User"})
        return;
    }
    const token =jwt.sign({
        id:user.id,
        username
    },JWT_SCRT)
    res.json({msg:"User Created Successfully",token:token})
})
UserRouter.post('/login',async (req,res)=>{
    const body:Schema=req.body;
    const{username,password}=body;
    if(!username||!password){
        res.json({msg:"Invalidate credentials"})
        return;
    }
    const user=await prisma.user.findFirst({
        where:{
            username,
            password
        }
    })
    if(!user){
        res.json({msg:"User not found in daatabase"})
        return
    }
    const token=jwt.sign({id:user.id,username},JWT_SCRT);
    res.json({
        token:token
    })
})