import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./styles.css";

interface Employee {
    id: string;
    name: string;
    birthday: Date;
    bio: string;
    departmentId: string;
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
			<h3><b>Name: </b>{employee.name}</h3>
            <h3><b>Bio: </b>{employee.bio}</h3>
            <h3><b>Birth Date: </b>{employee.birthday}</h3>
        </div>
    );
};

