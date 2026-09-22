import 'dotenv/config';
import express, { Request, Response } from 'express';
import mongoose, { Schema, model } from 'mongoose';


//conexion db refactorizado
const PORT = Number(process.env.PORT ?? 3000);
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/employees_db';

export const dbConnect = async(): Promise<void> => {
  try {
  await mongoose.connect(MONGO_URI)
  console.log(`Conexion establecida, escuchando en el puerto ${PORT}`)
  } catch(error){
    console.error('No se pudo conectar a MongoDB', error);
  }
}
