import React from "react"
import { useEffect, useState } from "react"
import { Department } from "../models/Models"
import api from "../utils/api"
import "./styles.css"

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
		  		<div className="employee_list_page">
		<h2>Department List</h2>
		
		<ul className="employee_list">
			{/* Added anchor tag so users can navigate to specific departments */}
			{departments.length && departments.map(d => <a href={`http://localhost:3000/departments/${d.id}`}><h3><li className="employee_detail" key={d.id}>{d.name}</li></h3></a>)}
		</ul>
		</div>
		</>
	)
}
