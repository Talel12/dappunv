import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";

const ListDiplome = () => {
  const diplomas = useSelector((store) => store?.diplomas?.list);

  const deleteDiploma = (diplomaId) => {
    // Replace the following line with your actual delete logic
    console.log(`Deleting diploma with ID: ${diplomaId}`);
  };

  return (
    <div className="container">
      <h2 className="text-center"> List Diplomes </h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Image</th>
            <th>Id Etudiant</th>
            <th>N° CIN</th>
            <th>Action</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {diplomas.map((diploma) => (
            <tr key={diploma?.id}>
              <td>{diploma?.id}</td>
              <td>{diploma?.student?.nom}</td>
              <td>{diploma?.student?.phoneNumber}</td>
              <td>
                {/* <Link
                  className="btn btn-info"
                  to={`/edit-diploma/${diploma.id}`}
                >
                  Update
                </Link> */}
                <button
                  className="btn btn-danger"
                  onClick={() => deleteDiploma(diploma?.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
              <td>
                <button
                  className={`btn btn-${
                    diploma?.signed ? "success" : "danger"
                  }`}
                  disabled={true}
                  // onClick={() => deleteDiploma(diploma?.id)}
                >
                  {diploma?.signed ? "Signed" : "Not Signed"}
                </button>
              </td>
              <td>
                {" "}
                <a
                  style={{ padding: "30px 50px" }}
                  class="cart-btn"
                  href={`https://ipfs.io/ipfs/${diploma?.hash}`}
                  target="_blanc"
                >
                  <i class="cart-icon ion-bag"></i>
                  <FontAwesomeIcon icon={faGraduationCap} size="1x" /> Affiche
                  le diplôme
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListDiplome;
