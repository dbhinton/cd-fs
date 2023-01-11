import React from "react";
import { Employee } from "../models/Models";
import api from "../utils/api";
import "./styles.css";

type EmployeeListProps = {};
type EmployeeListState = {
  allEmployees?: Employee[];
};

export class EmployeeList extends React.Component<
  EmployeeListProps,
  EmployeeListState
> {
  state: EmployeeListState = { };

  componentDidMount() {
	  const self = this
	  api.listEmployees()
	  .then(employees => self.setState({allEmployees: employees}))
  }

  render() {
    return (
		<div className="employee_list_page">
        <h2 className="employee_list_page_title">Employee List</h2>
        <ul className="employee_list">
          { !this.state.allEmployees && (
            <p>Fetching employees</p>
          )}
          {this.state.allEmployees?.map((employee)=> <EmployeeDetail key={employee.id} employee={employee}/>)}
        </ul>
      </div>
		);
  }
}

type EmployeeDetailProps = {
  employee: Employee;
}; 

const EmployeeDetail = ({ employee }: EmployeeDetailProps) => {
	return (
		<a href={`http://localhost:3000/employees/${employee.id}`}><li className="employee_detail">
			<h3>{employee.name}</h3>
		</li>
		</a>
	)
}
