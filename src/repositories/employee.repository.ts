//implementando patron repository
//Centralizo logica de interaccion con base de datos dentro de esta clase
import EmployeeModel from "../models/employee.model"
import {IEmployeeRepository, IEmployee} from "../interfaces/employee.interface";

export class EmployeeRepository implements IEmployeeRepository {
  async findAll(): Promise<IEmployee[]> {
    return await EmployeeModel.find()
  }
  async findById(id: string): Promise<IEmployee | null> {
    return await EmployeeModel.findById(id);
  }
  async create(employee: IEmployee): Promise<IEmployee> {
    return await EmployeeModel.create(employee);
  }
}
