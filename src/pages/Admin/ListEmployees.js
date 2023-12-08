import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ListEmployees = () => {
  const employees = useSelector((store) => store?.employees?.list);
  const deleteEmployee = (employeeId) => {
    // Replace the following line with your actual delete logic
    console.log(`Deleting employee with ID: ${employeeId}`);
  };

  return (
    <div className="container">
      <h2 className="text-center"> List Employees </h2>
      <Link to="/add-employee" className="bottt">
        {" "}
        Ajouter un Employee{" "}
      </Link>
      <table className="table table-bordered table-striped">
        <thead
          style={{
            backgroundColor: "teal",
            height: "50px",
            color: "white",
            textAlign: "center",
          }}
        >
          <th>#Id</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Nom Société</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.nom}</td>
              <td>{employee.prenom}</td>
              <td>{employee.nomSociete}</td>
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
