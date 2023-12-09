import React from "react";
import styled from "styled-components";

const NoteView = ({ etudiant, setShowNoteView }) => {
  console.log(etudiant);
  return (
    <DetailsContainer>
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <h1
          style={{
            position: "absolute",
            top: 0,
            right: 10,
            fontSize: 24,
            fontWeight: 700,
            cursor: "pointer",
          }}
          onClick={() => setShowNoteView(false)}
        >
          X
        </h1>
        <h2>Note Details</h2>

        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          <p>{etudiant?.etudiant?.nom}</p>
          <p>{etudiant?.etudiant?.prenom}</p>
        </div>
        <p>{etudiant?.etudiant?.phoneNumber}</p>
        <p>
          <strong>B2 Français:</strong> {etudiant?.b2Francais ? "Oui" : "Non"}
        </p>
        <p>
          <strong>B2 Anglais:</strong> {etudiant?.b2Anglais ? "Oui" : "Non"}
        </p>
        <p>
          <strong>Moyenne:</strong> {etudiant?.moyenne}
        </p>
        <p>
          <strong>Stage Valide:</strong> {etudiant?.stageValide ? "Oui" : "Non"}
        </p>
        {/* Additional element ("admis" or "refuser") */}
        <StatusIndicator status={etudiant?.admis}>
          {etudiant?.admis ? "Admis" : "refuser"}
        </StatusIndicator>
      </div>
    </DetailsContainer>
  );
};

const StatusIndicator = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => (props.status === "admis" ? "red" : "green")};
`;

export default NoteView;

const DetailsContainer = styled.div`
  width: 50vw;
  max-width: 800px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999999;
  background-color: white;
  border-radius: 10px;
  border: 1px solid black;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 10px;
  }
`;
