// controladores de empleado -  capa de presentacion
import { NotFoundError } from "../errorHandler/error.handler";
import { IEmployeeService } from "../interfaces/employee.interface";
import { NextFunction, Request, Response} from 'express'

export class EmployeeController {
  constructor(private readonly employeeService: IEmployeeService){} //Inyeccion de dependencia
  createEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employee = await this.employeeService.create(req.body)
      res.status(200).json({msg:'Empleado ha sido creado', data: employee})
    } catch (error) {
      next(error)
    }
  }
  getEmployees = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const employees = await this.employeeService.findAll();
      if(!employees.length) throw new NotFoundError("No hay empleados")
      return res.json(employees);
    } catch (error) {
      next(error)
    }
  }
  getEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
       const {id} = req.params
       const employee = await this.employeeService.findById(id.toString()) //al cambiar el tipo del que sera id en la interfaz, se corrige el error

       if (!employee) {
        throw new NotFoundError(`No se encuentra el empleado con el id ${id}`)
       }
       return res.json(employee);
     } catch (error) {
       next(error)
     }
  }
}
