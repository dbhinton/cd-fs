import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Employee {
    id: string;
    name: string;
    birthday: Date;
    bio: string;
    departmentId: string;
}

interface Department {
    id: string;
    name: string;
    employeeIds: string[];
}

interface Props {
    employeeId: string;
}

export const EmployeeDetail: React.FC<Props> = ({ employeeId }) => {
	const [employee, setEmployees] = useState<Employee|undefined>();
	let { id } = useParams<{ id: string }>()


    useEffect(() => {
        const fetchData = async () => {
			const employeeResponse = await axios.get(`http://localhost:4324/v1/employees/${employeeId}`);
			setEmployees(employeeResponse.data[0]);
        };
		fetchData();
    }, [employee, employeeId, id]);

    if (!employee) {
        return <p>Loading Employee's Details</p>;
    }

    return (
        <div>
			<h2>Employee Detail</h2>
			<h3>{employee.name}</h3>
        </div>
    );
};

