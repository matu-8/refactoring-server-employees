// controladores de empleado -  capa de presentacion
import EmployeeModel from "../models/employee.model";
import { IEmployeeService } from "../interfaces/employee.interface";
import { Request, Response} from 'express'

export class EmployeeController {
  constructor(private readonly employeeService: IEmployeeService){} //Inyeccion de dependencia
  createEmployee = async (req: Request, res: Response) => {
    try {
      const employee = await this.employeeService.create(req.body)
      res.status(200).json({msg:'Empleado ha sido creado', data: employee})
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
  getEmployees = async (_req: Request, res: Response) => {
    try {
      const employees = await EmployeeModel.find().sort({ createdAt: -1 });
      return res.json(employees);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
  getEmployee = async (req: Request, res: Response) => {
    try {
       const employee = await EmployeeModel.findById(req.params.id);

       if (!employee) {
         return res.status(404).json({ message: 'Empleado no encontrado' });
       }
       return res.json(employee);
     } catch (error) {
       console.error(error);
       return res.status(500).json({ message: 'Error interno del servidor' });
     }
  }
}
