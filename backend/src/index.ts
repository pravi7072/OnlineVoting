import express, { json } from "express"
import cors from "cors";
import { UserRouter } from "./routes/auth";
import { ElectonRouter } from "./routes/election";
const app=express();
app.use(json())
app.use(cors())

app.use('/api/v1/user',UserRouter);
app.use('/api/v1/elections',ElectonRouter);
app.listen(3000,()=>{console.log("Server Running on port 3000")})
