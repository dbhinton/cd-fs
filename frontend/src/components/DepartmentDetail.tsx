import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


interface Department {
    id: string;
    name: string;
    employeeIds: string[];
}

interface Props {
    departmentId: string;
}
// Functional components > Class-based components, much easier to read and test
export const DepartmentDetail: React.FC<Props> = ({ departmentId }) => {
	const [departmentEmployees, setDepartmentEmployees] = useState<Department[] | null>(null);
    const [department, setDepartment] = useState<Department[] | null>(null);
    // Enables me to access id in URL parameter
	let { id } = useParams<{ id: string }>()

//  useEffect hook to fetch the department details and employee details. The useEffect hook allows the component to run a piece of code, whenever the dependency passed to it changes. 
    useEffect(() => {
        const fetchData = async () => {
            // using axios to make request to backend to get departments and employees of that department
			const departmentEmployeesResponse = await axios.get(`http://localhost:4324/v1/departments/${departmentId}`);
			setDepartmentEmployees(departmentEmployeesResponse.data);
			const departmentResponse = await axios.get(`http://localhost:4324/v1/departments`);
			setDepartment(departmentResponse.data);
        };
        fetchData();
    }, [departmentId, departmentEmployees, department, id]);

    if (!departmentEmployees) {
        return <p>Loading Department Details</p>;
    }

    return (
        <div>
			<h1>{department && department.map((d)=> d.id == id? <h2>{d.name} Department</h2>: <></>)}</h1>
            <h2>Employee List:</h2> {departmentEmployees && departmentEmployees.map((e) => {
                // Added anchor tag so users can navigate to specific employee
				return <ul><a href={`http://localhost:3000/employees/${e.id}`}><li key={e.id}>{e.name}</li></a></ul>
			})}
        </div>
    );
};

