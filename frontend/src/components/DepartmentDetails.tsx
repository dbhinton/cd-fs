import { useEffect, useState } from "react"
import { Department } from "../models/Models"
import api from "../utils/api"

export const DepartmentDetails = () => {
	const [department, setDepartment] = useState<Department[]|undefined>()


	useEffect(() => {

		(async () => {
			try {
				setDepartment(await api.departmentDetail())
			}
			catch (ex) {
				console.error(ex)
			}
		})()

	}, [])


	if (!department) {
		return <p>Loading Department Details...</p>
	}
	else if (department.length === 0) {
		return <p>No departments</p>
	}

  	return (
		  <>
		<h2>Department List</h2>
		
		<ul>
			{department.length &&department.map(d => <li>{d.name}</li>)}
		</ul>
		</>
	)
}