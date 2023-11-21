import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EmployeeService from "../../services/employeeServices";

const ListEmployees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = () => {
    EmployeeService.getAllEmployees()
      .then((response) => {
        setEmployees(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteEmployee = (employeeId) => {
    EmployeeService.deleteEmployee(employeeId)
      .then((response) => {
        getAllEmployees();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center"> List Employees </h2>
      <Link to="/add-employee" className="bottt">
        {" "}
        Ajouter un Employee{" "}
      </Link>
      <table className="table table-bordered table-striped">
      <thead style={{backgroundColor:"teal", height:"50px", color:"white", textAlign:"center"}}>
        <th>  #Id </th>
          <th> Nom </th>
          <th> Prénom </th>
          <th> N° CIN</th>
          <th> Secteur </th>
          <th> Salaire</th>
          <th> Actions </th>
         
        
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td> {employee.id} </td>
              <td> {employee.firstName} </td>
              <td>{employee.lastName}</td>
              <td>{employee.emailId}</td>
              <td>
                <Link
                  className="btn btn-info"
                  to={`/edit-employee/${employee.id}`}
                >
                  Update
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteEmployee(employee.id)}
                  style={{ marginLeft: "10px" }}
                >
                  {" "}
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployees;
