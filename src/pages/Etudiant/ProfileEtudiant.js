import React, { useEffect } from "react";
import "./profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiplomaById } from "../../redux/diplomaSlice";

import QRCode from "qrcode.react";

const ProfileEmployee = () => {
  const diplome = {
    id: 5,
    hash: "Qmd7PK33ejovig8DwHifc2SC7eHRrVx6cfo8m4ts2hznr2",
    student: {
      id: 1,
      nom: "eya",
      prenom: "othman",
      dateNaissance: "2013-11-25T21:02:18.000+00:00",
      phoneNumber: "20549092",
    },
    university: {
      id: 1,
      nom: "Ecole Nationale d'Ingénieurs de Gabès",
      lieu: "RUE Omar Ben Khattab Zrig Gabes",
      directeurs: {
        id: 2,
        nom: "massoud",
        prenom: "ben ali",
      },
    },
    director: {
      id: 2,
      nom: "massoud",
      prenom: "ben ali",
    },
    signed: null,
  };

  const textToCopy = `${diplome?.hash}`; // Replace with your variable

  const handleCopyClick = () => {
    // Create a temporary textarea element to hold the text
    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;

    // Append the textarea to the document
    document.body.appendChild(textarea);

    // Select the text in the textarea
    textarea.select();

    // Execute the copy command
    document.execCommand("copy");

    // Remove the temporary textarea
    document.body.removeChild(textarea);

    // You can also provide some feedback to the user
    alert("Texte copié dans le presse-papiers !");
  };

  const dispatch = useDispatch();
  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  // Example usage:
  const formattedDate = formatDate("2013-11-25T21:02:18.000+00:00");
  console.log(formattedDate); // Output: "25/11/2013"

  // useEffect(() => {
  //   dispatch(fetchDiplomaById(5));
  // }, [dispatch]);

  return (
    <div>
      <div class="wrapper">
        <div class="outer">
          <div class="content animated fadeInLeft">
            <span class="bg animated fadeInDown">Admise</span>
            <h1 className="tiitre">
              {diplome?.student?.nom} {diplome?.student?.prenom}
            </h1>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div class="coordonne">
                <h5>Date de Naissance:</h5>
                <h5>{formatDate(diplome?.student?.dateNaissance)} </h5>
              </div>
              <div class="coordonne">
                <h5>Tel:</h5>
                <h5>{diplome?.student?.phoneNumber} </h5>
              </div>
              <div class="coordonne">
                <h5>{diplome?.university?.nom} </h5>
                {/* <h6>13</h6> */}
              </div>
              <div class="coordonne">
                <h5> {diplome?.university?.lieu} </h5>
              </div>
              {/* <div class="coordonne">
                <h5> Moyenne générale</h5>
                <h6 className="littl">13</h6>
              </div> */}
            </div>

            <div
              class="button"
              style={{ display: "flex", alignItems: "center", gap: 20 }}
            >
              <a
                style={{ padding: "30px 50px" }}
                class="cart-btn"
                href={`https://ipfs.io/ipfs/${diplome?.hash}`}
                target="_blanc"
              >
                <i class="cart-icon ion-bag"></i>
                <FontAwesomeIcon icon={faGraduationCap} size="1x" /> Affiche le
                diplôme
              </a>
              <button onClick={handleCopyClick} style={{ padding: 10 }}>
                Partager
              </button>
            </div>
          </div>
          {/* <img
            src="https://media.istockphoto.com/id/1473893094/photo/beautiful-young-arab-female-student-standing-outdoors-with-workbooks-in-hands.jpg?s=612x612&w=0&k=20&c=QfXcfE51DyJVA5QDQw16ejTIEN4fPW8eMwoyMsJfLSg="
            width="400px"
            height="400px"
            class="animated fadeInRight"
            style={{ marginTop: "40px" }}
            className="profileimg"
          ></img> */}
          <div
            style={{
              width: 400,
              height: 400,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
            }}
            className="profileimg fadeInRight"
          >
            <QRCode
              size="300"
              value={`https://ipfs.io/ipfs/${diplome?.hash}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEmployee;
