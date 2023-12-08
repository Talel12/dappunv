import React, { useEffect } from "react";
import ProfileDirector from "./ProfileDirector";
import ListDiplome from "./ListDiplome";
import { useDispatch } from "react-redux";
import { fetchAllDiplomas } from "../../redux/diplomaSlice";

const Director = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllDiplomas());
  }, []);
  return (
    <div>
      <ProfileDirector />
      <ListDiplome />
    </div>
  );
};

export default Director;
