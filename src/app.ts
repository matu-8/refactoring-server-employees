import express from "express";
import { dbConnect } from "./server";

//middlewares
const app = express();
app.use(express.json());
//conexion
dbConnect();
