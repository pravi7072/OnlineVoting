import express, { json, Request, Response } from "express"
import { PrismaClient, } from "@prisma/client";
import jwt from "jsonwebtoken"
import zod from "zod";
import cors from "cors";
import {AdminMiddleware, AuthMiddleware, CustomRequest } from "../middlewares/Authorization";
const prisma=new PrismaClient()
export const ElectonRouter=express.Router();
ElectonRouter.use(express.json())
ElectonRouter.use(cors())
interface Election{
    title:string;
    options:string[];
    createdBy:number
}
interface Vote{
    electionId:number;
    option:string;
    userId:string;
}
ElectonRouter.post("/",AdminMiddleware,async(req:Request,res:Response)=>{
    const body:Election=req.body
    const{title,options}=body;
    const createdBy=(req as CustomRequest).id
    if(!title||!options||!createdBy||!createdBy){
        res.json({msg:"Election fields are not correct"})
        return
    }
    const election=await prisma.election.create({
        data:{
            title,
            options,
            createdBy
        }
    })
    if(!election){
        res.json({msg:"Cannot create election"})
        return;
    }
    res.json({msg:"Election Created Successfully",election})
})
ElectonRouter.get("/all", async (req, res) => {
    try {
        const elections = await prisma.election.findMany();

        if (elections.length === 0) {
            res.status(404).json({ msg: "No election found" });
            return
        }

        res.json({ elections });
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error", error: (error as Error).message });
    }
});


ElectonRouter.post("/vote",AuthMiddleware,async(req,res)=>{
    const body:Vote=req.body;
    const{electionId,option}=body;
    const userId=(req as CustomRequest).id
    if(!electionId||!option||!userId){
        res.json({msg:"Something wrong with the inputs"})
        return;
    }
    const check=await prisma.vote.findFirst({where:{
        userId,electionId
    }})
    if(check){
        res.json({msg:"You have already voted"})
        return
    }
    const vote= await prisma.vote.create({
        data:{
            electionId,
            userId,
            option
        }
    })
    if(!vote){
        res.json("Could not cast your vote")
        return;
    }
    res.json({msg:"Your vote added casted successfully",vote})
})
ElectonRouter.get('/:electionId', async (req, res) => {
    const electionId= Number(req.params.electionId);
    const results = await prisma.election.findFirst({
        where:{
            id:electionId
        }
    })
    res.json(results);
});
ElectonRouter.get('/results/:electionId', async (req, res) => {
    const { electionId } = req.params;
    const results = await prisma.vote.groupBy({
        by: ['option'],
        _count: { option: true },
        where: { electionId: parseInt(electionId) }
    });
    res.json(results);
});
