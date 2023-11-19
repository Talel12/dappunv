import React from "react";
import ProfileEmployee from "./ProfileEmployee";
import ListEmployees from "./ListEmployees";

const Employee = () => {
  return (
    <div>
      <h1>Employee</h1>
      {/*
      //liste of stage 
      // liste of offre d'emploit 
      // add stage or offre 
      // Verification d'un hashage d'un diplome */}
      <ProfileEmployee />
      <ListEmployees />
    </div>
  );
};

export default Employee;
