import { Router } from 'express'
import { EmployeeController } from '../controllers/employee.controller';
import { EmployeeRepository } from '../repositories/employee.repository';
import { EmployeeService } from '../services/employee.service';

const router = Router();
//instanciacion de clases
const employeeRepository = new EmployeeRepository();
const employeeService = new EmployeeService(employeeRepository)
const employeeController = new EmployeeController(employeeService)

router.get('/employees', employeeController.getEmployees)
router.get('/employees/:id', employeeController.getEmployee)
router.post('/employees', employeeController.createEmployee)

export default router;
