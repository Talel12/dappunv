import React, { useEffect } from "react";
import ProfileAdmin from "./ProfileAdmin";
import ListDiplome from "./ListDiplome";
import ListEtudiant from "./ListEtudiant";
import ListEmployees from "./ListEmployees";
import { useDispatch } from "react-redux";
import { fetchAllEmployees } from "../../redux/employeeSlice";
import { fetchAllDiplomas } from "../../redux/diplomaSlice";
import { fetchAllStudents } from "../../redux/studentSlice";

const Admin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllEmployees());
    dispatch(fetchAllDiplomas());
    dispatch(fetchAllStudents());
  }, []);
  return (
    <div>
      <ProfileAdmin />
    </div>
  );
};

export default Admin;
