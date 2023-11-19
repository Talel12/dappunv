import React from "react";
import './profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
const ProfileEmployee = () => {
  return <div>
    <div class="wrapper">
	<div class="outer">
		<div class="content animated fadeInLeft">
			<span class="bg animated fadeInDown">Admise</span>
			<h1>Asile Dawed</h1>
			<div style={{display:"flex",flexDirection:"column"}}>
        <div class="coordonne">
          <h5>Age:</h5>
          <h6>22</h6>
          
        </div>
        <div class="coordonne">
          <h5>Class:</h5>
          <h6>3LGI</h6>
          
        </div>
        <div class="coordonne">
          <h5> Moyenne s1:</h5>
          <h6>13</h6>
          
        </div>
        <div class="coordonne">
          <h5> Moyenne s2:</h5>
          <h6>13</h6>
          
        </div>
        <div class="coordonne">
          <h5> Moyenne générale</h5>
          <h6>13</h6>
          
        </div>
      </div>
			
			<div class="button">
			<a class="cart-btn" href="#"><i class="cart-icon ion-bag"></i><FontAwesomeIcon icon={faGraduationCap} size="1x" /> Affiche le diplôme</a>
			</div>
			
		</div>
		<img src="https://o.remove.bg/downloads/08a55384-87f3-4388-afcf-333f36979d09/jeune-etudiante-femme-portant-veste-jean-lunettes-tenant-dossiers-colores-montrant-pouce-vers-haut-rose-removebg-preview.png" width="400px" height="400px" class="animated fadeInRight" style={{marginTop:"40px"}}></img>
	</div>
	
</div></div>;
};

export default ProfileEmployee;
