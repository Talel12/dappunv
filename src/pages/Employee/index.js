import React from "react";
import ProfileEmployee from "./ProfileEmployee";
import ListEmployees from "./ListEmployees";
import Offrestage from "./offrestage";
import employeeServices from "../../services/employee.services";

const Employee = () => {
  const employers = employeeServices.getAllEmployees();
  console.log(employers);
  return (
    <div>
      <h1>Employee</h1>
      {/*
      //liste of stage 
      // liste of offre d'emploit 
      // add stage or offre 
      // Verification d'un hashage d'un diplome */}
      <ProfileEmployee />
      <Offrestage />
    </div>
  );
};

export default Employee;
