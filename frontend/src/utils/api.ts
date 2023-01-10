
import { Department, Employee } from '../models/Models'
import { HTTPMethod, Service, Request, request } from './_abstract'
import axios from 'axios'



const Requests = {
    departments: new Request<Department[]>(HTTPMethod.get, "v1/departments"),
    department_id: new Request<Department[]>(HTTPMethod.get, `v1/departments/${id}`),
    employees: new Request<Employee[]>(HTTPMethod.get, 'v1/employees'),
    employee_id: new Request<Employee[]>(HTTPMethod.get, `v1/employee/${id}`),
}

class Backend implements Service {
    baseUrl = process.env.REACT_APP_API_HOST

    async listEmployees(): Promise<Employee[]> {
        return request(this, Requests.employees).call()
    }

    async listDepartments(): Promise<Department[]> {
        return request(this, Requests.departments).call()
    }

    async departmentDetail(): Promise<Department[]> {
        return request(this, Requests.department_id).call()
    }

    async employeeDetail(): Promise<Employee[]> {
        return request(this, Requests.employee_id).call()
    }
}




export default new Backend()