import React, { useState } from "react";
import "./profilead.css";
import ListDiplome from "./ListDiplome";
import ListEtudiant from "./ListEtudiant";
import ListEmployees from "./ListEmployees";
import { useSelector } from "react-redux";

function Panel({ title, children, isActive, onShow }) {
  return (
    <section className={`panel ${isActive ? "active" : "inactive"}`}>
      {/* <h3>{title}</h3> */}
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={onShow}>Afficher</button>
      )}
    </section>
  );
}

const ProfileAdmin = () => {
  const user = useSelector((store) => store?.auth?.user);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePanelChange = (index) => {
    // Scroll to the top when changing panels
    window.scrollTo(0, 0);
    setActiveIndex(index);
  };

  return (
    <div>
      <div className="wrapper">
        <div className="profile-card js-profile-card">
          <div className="profile-card__img">
            <img
              src="https://icon-library.com/images/admin-icon/admin-icon-12.jpg"
              alt="profile card"
              className="imagep"
            />
          </div>

          <div className="profile-card__cnt js-profile-cnt">
            <div className="profile-card__name">{user?.sub}</div>
            <div className="profile-card__txt">
              Admin from <strong>Mesopotamia</strong>
            </div>
            <div className="profile-card-loc">
              <span className="profile-card-loc__icon"></span>
              <span className="profile-card-loc__txt">Tunis, Gabes</span>
            </div>

            <div className="profile-card-inf">
              <div className="profile-card-inf__item">
                <div
                  className="nav-bar"
                  style={{
                    fontSize: 20,
                    display: "flex",
                    gap: 10,
                    justifyContent: "center",
                    padding: 10,
                  }}
                >
                  <button
                    className={`nav-btn ${activeIndex === 0 && "active"}`}
                    onClick={() => handlePanelChange(0)}
                  >
                    List Etudiants
                  </button>
                  <button
                    className={`nav-btn ${activeIndex === 1 && "active"}`}
                    onClick={() => handlePanelChange(1)}
                  >
                    List Diplomes
                  </button>
                  <button
                    className={`nav-btn ${activeIndex === 2 && "active"}`}
                    onClick={() => handlePanelChange(2)}
                  >
                    List Employees
                  </button>
                </div>

                <Panel
                  title="LIST ETUDIANTS"
                  isActive={activeIndex === 0}
                  onShow={() => handlePanelChange(0)}
                >
                  <div className="bodylist">
                    <ListEtudiant />
                  </div>
                </Panel>
                <Panel
                  title="LIST EMPLOYEES"
                  isActive={activeIndex === 2}
                  onShow={() => handlePanelChange(2)}
                >
                  <div className="bodylist">
                    <ListEmployees />
                  </div>
                </Panel>
                <Panel
                  title="LIST DIPLOMES"
                  isActive={activeIndex === 1}
                  onShow={() => handlePanelChange(1)}
                >
                  <div className="bodylist">
                    <ListDiplome />
                  </div>
                </Panel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAdmin;
