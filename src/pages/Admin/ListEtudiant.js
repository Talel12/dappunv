import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NoterEtudiant from "./NoterEtudiant";
import NoteView from "./NoteView";

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
                {" "}
                {student.diploma === null ? (
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
                      setShowNoteView(true);
                      setSelectedStudentView({
                        etudiant: student,
                        note: noteTab[i],
                      });
                    }}
                    style={{ marginLeft: "10px" }}
                  >
                    Voir Diplome
                  </button>
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
