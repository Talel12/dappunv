import React from "react";
import "./directeur.css";
import { useSelector } from "react-redux";

const ProfileDirector = () => {
  const user = useSelector((store) => store?.auth?.user);

  return (
    <div>
      <div class="secton">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4323/4323015.png"
          alt=""
          className="imagee"
        />
        <h2 className="nom">{user?.sub}</h2>
        <h4 id="title">Directeur </h4>
        <h4 id="title">{user?.username} </h4>
        <h4 id="title">{user?.mail} </h4>
      </div>
    </div>
  );
};

export default ProfileDirector;
