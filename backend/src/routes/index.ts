
import { Router, Response, Request } from 'express'
import axios from 'axios'

const router: Router = Router()

// Creates an instance of the Axios client with a custom baseURL of http://localhost:4324. This means that all requests made using this instance of the client will have the baseURL http://localhost:4324 prepended to the requested endpoint. This reduces 
// code repetition 
const axiosInstance = axios.create({
    baseURL: 'http://localhost:4324',
  });

  interface Employee {
    id: string;
    name: string;
    birthday: string;
    bio: string;
    departmentId: string;
}

router.get('/v1/departments', (_req: Request, res: Response) => {
    res.send([
        {
            id: '2',
            name: "Full Stack Development",
            employeeIds: ["82338", "32673"]
        },
        {
            id: '3',
            name: "Connected Devices Engineering",
            employeeIds: ["82837"]
        },
        {
            id: '4',
            name: "Android Engineering",
            employeeIds: ["82837"]
        },
    ])
})

// Made all Id's strings to avoid parsing issues
router.get('/v1/employees', (_unused: Request, res: Response) => {
    res.send([
        {
            id: "82837",
            name: "Bob Smith",
            birthday: new Date("1985-09-27"),
            bio: "Bob has been programming computers for entirely too long!",
            departmentId: "3"
        },
        {
            id: "81832",
            name: "Ada Burr",
            birthday: new Date("1985-10-18"),
            bio: "Ada loves full stack development.",
            departmentId: "4"
        },
        {
            id: '82338',
            name: "Molly Davis",
            birthday: new Date("1985-09-27"),
            bio: "Molly once found a bug in a compiler",
            departmentId: "2"
        },
        {
            id: "32673",
            name: "François Allende",
            birthday: new Date("1985-09-27"),
            bio: "François is the best QA engineer West of the Susquehanna river.",
            departmentId: "2"
        },
        {
            id: "zc",
            name: "Juan Cortez",
            birthday: '1984-09-22',
            bio: "Juan's been programming computers since the days of ATARI BASIC.",
            departmentId: "4"
        }
    ])
})

// Listening for a GET request sent to the /v1/employees/:id route
router.get('/v1/employees/:id', async (req: Request, res: Response) => {
    const employeeId = req.params.id
    let employees: Employee[] = []

    // Get employees data
    try {
        employees = (await axiosInstance.get(`/v1/employees`)).data;
        let employee = employees.filter(employee => employee.id === employeeId)
        res.send(employee);
    } catch (error) {
        console.log(error);
    }
})


function filterEmployeesByDepartment(employees: Employee[], departmentId: string): Employee[] {
    return employees.filter(employee => employee.departmentId === departmentId)
}

// Listening for a GET request sent to the /v1/departments/:id route
router.get('/v1/departments/:id', async (req: Request, res: Response) => {
    const departmentId = req.params.id;
    let employeesInDepartment: Employee[] = [];

    try {
        // Make a GET request to the /v1/employees endpoint
        const employeeData = await axiosInstance.get('/v1/employees');
        const allEmployees = employeeData.data;

        employeesInDepartment = filterEmployeesByDepartment(allEmployees, departmentId)
        // Send the filtered list of employees to the client
        res.send(employeesInDepartment);
    } catch (error) {
        console.log(error);
    }
})


export default router