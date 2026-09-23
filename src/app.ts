import express from "express";
import { dbConnect } from "./server";
import router from "./routes/employee.route";
import { ErrorMiddleware } from "./errorHandler/error.handler.middleware";

//middlewares
const app = express();
app.use(express.json());
app.use('/api', router);
//conexion
app.use(ErrorMiddleware)

app.listen(3000, async ()=> {
  await dbConnect();
  console.log("Servidor inicializado");
});
