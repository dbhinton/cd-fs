import React from "react"
import { useEffect, useState } from "react"
import { Department } from "../models/Models"
import api from "../utils/api"

export const DepartmentList = () => {
	const [departments, setDepartments] = useState<Department[]|undefined>()


	useEffect(() => {

		(async () => {
			try {
				setDepartments(await api.listDepartments())
			}
			catch (ex) {
				console.error(ex)
			}
		})()

	}, [])


	if (!departments) {
		return <p>Loading Departments...</p>
	}
	else if (departments.length === 0) {
		return <p>No departments</p>
	}

  	return (
		  <>
		<h2>Department List</h2>
		
		<ul>
			{departments.length &&departments.map(d => <li key={d.id}><a href={`http://localhost:3000/departments/${d.id}`}>{d.name}</a></li>)}
		</ul>
		</>
	)
}