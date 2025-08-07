import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();
const JWT_SCRT = process.env.JWT_SECRET || "fallbackSecret";

export interface CustomRequest extends Request {
    id: number;
}

interface Decode {
    id: number;
    username: string;
}

export const AuthMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const header = req.headers.authorization;
        if (!header || !header.startsWith("Bearer ")) {
            res.status(401).json({ msg: "Invalid Token Format" });
            return;
        }

        const token = header.split(" ")[1];
        if (!token) {
            res.status(401).json({ msg: "Token is missing" });
            return;
        }

        const decoded = jwt.verify(token, JWT_SCRT) as Decode;
        const user = await prisma.user.findUnique({
            where: { id: decoded.id, username: decoded.username },
        });

        if (!user) {
            res.status(403).json({ msg: "Invalid Authorization" });
            return;
        }

        (req as CustomRequest).id = decoded.id;
        next();
    } catch (error) {
        res.status(403).json({ msg: "Invalid Token", error: (error as Error).message });
        return;
    }
};

export const AdminMiddleware=async(req:Request,res:Response,next:NextFunction)=>{
    const header=req.headers.authorization;
    if(!header||!header.startsWith("Bearer")){
        res.json({msg:"Invalid Token"})
        return
    }
    const token=header.split(" ")[1];
    const decoded= jwt.verify(token,JWT_SCRT) as Decode;
    const response=await prisma.user.findUnique({
        where:{
            username:decoded.username,
            id:decoded.id,
            role:"ADMIN"
        }
    })
    if(!response){
        res.json({msg:"Invalid Authorization"})
        return;
    }
    (req as CustomRequest).id=decoded.id
    next()
}