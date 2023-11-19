import React from "react";
import ProfileDirector from "./ProfileDirector";
import ListDiplome from "./ListDiplome";

const Director = () => {
  return (
    <div>
      <h1>Director</h1>
      //signer les diplomes
      <ProfileDirector />
      <ListDiplome />
    </div>
  );
};

export default Director;
