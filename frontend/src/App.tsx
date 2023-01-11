import React from "react";
import "./App.css";
import { Employee } from "./models/Models";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import { EmployeeList } from "./components/EmployeeList";
import { EmployeeDetail } from "./components/EmployeeDetail";
import { DepartmentList } from "./components/DepartmentList";
import { DepartmentDetail } from "./components/DepartmentDetail";

type AppProps = {};
type AppState = {
  selectedEmployee: Employee | null;
};

export class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    // optional second annotation for better type inference
    selectedEmployee: null,
  };

  render() {
    return (
      <>
            <Router>
        <header className='header'>
          <h1>Employee Directory</h1>
          <ul>
            <li>
              <Link to="/employees">Employees</Link>
            </li>
            <li>
              <Link to="/departments">Departments</Link>
            </li>
          </ul>
        </header>
        <div className="mainContent">
          <Switch>
          <Route path="/employees/:id" render={({match}) => (
              <EmployeeDetail employeeId={match.params.id}/>
          )}>
            </Route>
            <Route path="/employees">
              <EmployeeList />
            </Route>
            <Route path="/departments/:id" render={({ match }) => (
    <DepartmentDetail departmentId={match.params.id} />
)} />
            <Route path="/departments">
              <DepartmentList />
            </Route>
            <Route path="/">
              <EmployeeList />
            </Route>
          </Switch>
        </div>
      </Router>
      </>
    );
  }
}

export default App;
