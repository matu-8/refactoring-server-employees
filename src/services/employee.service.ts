import { IEmployeeRepository, IEmployee,IEmployeeService, IEmployeeCreate } from "../interfaces/employee.interface";
import {BadRequestError,NotFoundError } from "../errorHandler/error.handler"
export class EmployeeService implements IEmployeeService {
  constructor(private readonly employeeRepository: IEmployeeRepository) { }

  async create(data: IEmployeeCreate): Promise<IEmployee> {
    const { name, position, baseSalary, yearsOfService } = data;

    if (!name || !position) {
      throw new BadRequestError('Nombre y puesto son obligatorios')
    }

    if (typeof baseSalary !== 'number' || baseSalary <= 0) {
      throw new Error ('El salario base debe ser mayor a 0');
    }

    if (typeof yearsOfService !== 'number' || yearsOfService < 0 || !Number.isInteger(yearsOfService)
    ) {
      throw new Error ('El anio de servicio debe ser un numero entero mayor que 0')
    }
    const bonus = baseSalary * 0.02 * yearsOfService;
    const finalSalary = baseSalary + bonus;
    const newEmployee = {
      ...data,
      finalSalary
    }
    return await this.employeeRepository.create(newEmployee)
  }
  async findAll(): Promise<IEmployee[]>{
     return await this.employeeRepository.findAll()
  }
  async findById(id: string): Promise<IEmployee | null> {
    return await this.employeeRepository.findById(id)
  }
}
