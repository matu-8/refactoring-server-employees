import { Schema, model } from "mongoose";
import {IEmployee} from "../interfaces/employee.interface";

const employeeSchema = new Schema<IEmployee>(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    baseSalary: { type: Number, required: true },
    yearsOfService: { type: Number, required: true },
    finalSalary: { type: Number, required: true }
  },
  {
    timestamps: true,
  }
);

const EmployeeModel = model('Employee', employeeSchema);

export default EmployeeModel;
