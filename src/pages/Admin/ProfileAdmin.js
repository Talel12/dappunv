import React from "react";
import { useState } from 'react';
import "./profilead.css"
import ListDiplome from "./ListDiplome";
import ListEtudiant from "./ListEtudiant";
import ListEmployees from "./ListEmployees";

function Panel({
  title,
  children,
  isActive,
  onShow
}) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={onShow}>
          Afficher
        </button>
      )}
    </section>
  );}
const ProfileAdmin = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return <div>

<div class="wrapper">
  <div class="profile-card js-profile-card">
    <div class="profile-card__img">
      <img src="https://icon-library.com/images/admin-icon/admin-icon-12.jpg" alt="profile card"/>
    </div>

    <div class="profile-card__cnt js-profile-cnt">
      <div class="profile-card__name">Muhammed Erdem</div>
      <div class="profile-card__txt">Admin from <strong>Mesopotamia</strong></div>
      <div class="profile-card-loc">
        <span class="profile-card-loc__icon">
    
        </span>

        <span class="profile-card-loc__txt">
         Tunis, Gabes
        </span>
      </div>

      <div class="profile-card-inf">
        <div class="profile-card-inf__item">
        <Panel
        title="LIST ETUDIANTS"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
          <div className="bodylist"><ListEtudiant /></div>
    
      </Panel>
      <Panel
        title="LIST DIPLOMES"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
       <div className="bodylist"> <ListDiplome /></div>
  
      </Panel>
      <Panel
        title="LIST EMPLOYEES"
        isActive={activeIndex === 2}
        onShow={() => setActiveIndex(2)}
      >
        <div className="bodylist"> <ListEmployees /></div>
      </Panel>
    
        </div>


       
      </div>

    

  
    </div>



  </div>

</div>



</div>;
};

export default ProfileAdmin;
