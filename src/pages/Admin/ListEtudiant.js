import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NoterEtudiant from "./NoterEtudiant";
import NoteView from "./NoteView";
import styled from "styled-components";

const ListEtudiant = () => {
  const students = useSelector((store) => store?.students?.list);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [showNoteView, setShowNoteView] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedStudentView, setSelectedStudentView] = useState(null);

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  let noteTab = [
    { b2Francais: true, b2Englais: true, moyenne: 12, stageValide: false },
    null,
    null,
    { b2Francais: false, b2Englais: true, moyenne: 10, stageValide: true },
  ];
  const deleteStudent = (id) => {
    // Implement your delete logic here
    console.log(`Deleting student with ID: ${id}`);
  };

  return (
    <div className="container">
      {showNoteForm && (
        <NoterEtudiant
          etudiant={selectedStudent}
          setShowNoteForm={setShowNoteForm}
        />
      )}
      {showNoteView && (
        <NoteView
          etudiant={selectedStudentView}
          setShowNoteView={setShowNoteView}
        />
      )}
      <h2 className="text-center"> List Etudiants </h2>
      <Link to="/add-employee" className="bottt">
        Ajouter un Etudiant
      </Link>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>#Id</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Date de Naissance</th>
            <th>Numéro de Téléphone</th>
            <th>Actions</th>
            <th>Noter</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, i) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.nom}</td>
              <td>{student.prenom}</td>
              <td>{formatTimestamp(student.dateNaissance)}</td>
              <td>{student.phoneNumber}</td>
              <td>
                <Link
                  className="btn btn-info"
                  to={`/edit-employee/${student.id}`}
                >
                  Update
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteStudent(student.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
              <td>
                {student.moyenne === 0 ? (
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setShowNoteForm(true);
                      setSelectedStudent(student);
                    }}
                    style={{ marginLeft: "10px" }}
                  >
                    Noter
                  </button>
                ) : (
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setShowNoteForm(true);
                      setSelectedStudent(student);
                    }}
                    style={{ marginLeft: "10px" }}
                  >
                    Update Note
                  </button>
                )}
              </td>
              <td>
                {" "}
                {student.diploma ? (
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setShowNoteView(true);
                      setSelectedStudentView(student);
                    }}
                    style={{ marginLeft: "10px" }}
                  >
                    Voir Note
                  </button>
                ) : student.moyenne === 0 ? (
                  <button
                    className="btn btn-danger"
                    // onClick={() => {
                    //   setShowNoteForm(true);
                    //   setSelectedStudent(student);
                    // }}
                    style={{ marginLeft: "10px" }}
                  >
                    Pas de note
                  </button>
                ) : student.admis ? (
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setShowNoteView(true);
                      setSelectedStudentView(student);
                    }}
                    style={{ marginLeft: "10px" }}
                  >
                    Voir Note
                  </button>
                ) : (
                  <h3>Refuser</h3>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEtudiant;

const FormModal = styled.div`
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

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;

    label {
      display: flex;
      align-items: center;
    }

    input {
      margin-left: 10px;
    }
  }

  .button-container {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 20px;

    button {
      background-color: #4caf50;
      color: white;
      padding: 10px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #45a049;
      }
    }
  }
`;
