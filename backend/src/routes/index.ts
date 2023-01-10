import { Router, Response, Request } from 'express'
import axios from 'axios'

const router: Router = Router()

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4324',
  });

router.get('/v1/departments', (_req: Request, res: Response) => {
    res.send([
        {
            id: 2,
            name: "Full Stack Development",
            employeeIds: ["82338", "32673"]
        },
        {
            id: 3,
            name: "Connected Devices Engineering",
            employeeIds: ["82837"]
        },
        {
            id: 4,
            name: "Android Engineering",
            employeeIds: ["82837"]
        },
    ])
})

router.get('/v1/employees', (_unused: Request, res: Response) => {
    console.log('employees page')
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

router.get('/v1/employees/:id', async (req: Request, res: Response) => {
    const employeeId = req.params.id
    const employees = []

    // Get employees data
    const employeeData = await fetch('/v1/employees')
    const employeesList = await employeeData.json()
    
    // Filter employees by department
    for (const employee of employeesList) {
        if (employee.id === employeeId) {
            employees.push(employee)
        }
    }

    res.send(employees)
})

router.get('/v1/departments/:id', async (req: Request, res: Response) => {
    console.log('depID')
    const departmentId = req.params.id
    const employees = []

    try {
        // Make a GET request to the /v1/employees endpoint
        const employeeData = await axiosInstance.get('/v1/employees');
        const employeesList = employeeData.data;

        // Filter employees by department
        for (const employee of employeesList) {
            if (employee.departmentId === departmentId) {
                employees.push(employee)
            }
        }
        res.send(employees);
    } catch (error) {
        console.log(error);
    }
})


export default router