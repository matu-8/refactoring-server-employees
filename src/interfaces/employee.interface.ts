

export interface IEmployee {
   name: string;
   position: string;
   baseSalary: number;
   yearsOfService: number;
   finalSalary: number;
}
export type IEmployeeCreate = Omit<IEmployee, 'finalSalary'> //DTO (Data transfer object) para creacion de un empleado

//Interfaz para ser utilizada en clase de servicio
export interface IEmployeeRepository {
  //todos las acciones con la base de datos que hace employee
  findAll(): Promise<IEmployee[]> //tipo genericos
  findById(id: string): Promise<IEmployee| null>
  create(data: IEmployee): Promise<IEmployee>
}

//Interface para poder ser utilizada en clase
export interface IEmployeeService {
  //todos las acciones con la base de datos que hace employee
  findAll(): Promise<IEmployee[]> //tipo genericos
  findById(id: string): Promise<IEmployee| null>
  create(data: IEmployeeCreate): Promise<IEmployee>
}
