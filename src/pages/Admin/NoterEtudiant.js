import React, { useEffect, useState } from "react";
import getWeb3 from "../../Ethereum";
import VerificationContratEtudiant from "../../contracts/VerifierContratEtudiant.json";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { createDiploma, fetchAllDiplomas } from "../../redux/diplomaSlice";
import { createToExportElement } from "./createPDF";
import { fetchAllStudents } from "../../redux/studentSlice";

const NoterEtudiant = ({ etudiant, setShowNoteForm }) => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [formData, setFormData] = useState({
    b2Francais: false,
    b2Anglais: false,
    moyenne: 0,
    stageValide: false,
  });

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const ethereumWeb3 = await getWeb3();
        setWeb3(ethereumWeb3);

        // Replace 'VerifierContratEtudiant' with the actual name of your smart contract
        const deployedNetwork =
          VerificationContratEtudiant.networks[
            Object.keys(VerificationContratEtudiant.networks)[0]
          ];
        const instance = new ethereumWeb3.eth.Contract(
          VerificationContratEtudiant.abi,
          deployedNetwork && deployedNetwork.address
        );

        setContract(instance);
      } catch (error) {
        console.error("Error initializing web3:", error);
      }
    };

    initWeb3();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    console.log(checked);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value === "on" ? checked : value,
    }));
  };
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    if (
      formData.b2Anglais &&
      formData.b2Francais &&
      formData.stageValide &&
      formData.moyenne >= 10
    ) {
      try {
        const result = await createToExportElement({
          hash: null,
          student: {
            id: etudiant.id,
            nom: etudiant.nom,
            prenom: etudiant.prenom,
            dateNaissance: etudiant.dateNaissance,
            phoneNumber: etudiant.phoneNumber,
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
        })
          .then((res) =>
            dispatch(
              createDiploma({
                hash: res?.data?.IpfsHash,
                student: {
                  id: etudiant.id,
                },
                university: {
                  id: 1,
                },
                director: {
                  id: 2,
                },
              })
            )
          )
          .then(() => {
            alert("diplome generer avec success");
            dispatch(fetchAllStudents());
            dispatch(fetchAllDiplomas());
            setShowNoteForm(false);
          });

        console.log(result?.data?.IpfsHash);

        // await contract.methods
        //   .ajouterEtudiant(
        //     formData.b2Francais,
        //     formData.b2Anglais,
        //     formData.moyenne,
        //     formData.stageValide
        //   )
        //   .send({ from: (await web3.eth.getAccounts())[0] });

        console.log("Student details added successfully!");
      } catch (error) {
        console.error("Error adding student details:", error);
      }
    } else {
      alert("Etudant Refusé");
    }
  };

  const handleVerifyDiploma = async () => {
    if (contract) {
      try {
        const result = await contract.methods.verifierDiploma();
        //   .call({ from: account });
        //await web3.eth.getAccounts())[0]

        console.log("Diploma verification result:", result);
      } catch (error) {
        console.error("Error verifying diploma:", error);
      }
    }
  };

  const handleMarkDiplomaObtained = async () => {
    if (contract) {
      try {
        await contract.methods
          .marquerDiplomeObtenu()
          .send({ from: (await web3.eth.getAccounts())[0] });
        console.log("Diploma marked as obtained successfully!");
      } catch (error) {
        console.error("Error marking diploma as obtained:", error);
      }
    }
  };
  return (
    <FormModal>
      <form onSubmit={handleSubmit}>
        <label>
          B2 Français:
          <input
            type="checkbox"
            name="b2Francais"
            defaultChecked={formData.b2Francais}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          B2 Anglais:
          <input
            type="checkbox"
            name="b2Anglais"
            defaultChecked={formData.b2Anglais}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Moyenne:
          <input
            type="number"
            name="moyenne"
            value={formData.moyenne}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Stage Valide:
          <input
            type="checkbox"
            name="stageValide"
            defaultChecked={formData.stageValide}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
          <button type="submit" onClick={handleSubmit}>
            Noter l'etudiant {etudiant.nom}
          </button>
          <button type="reset" onClick={() => setShowNoteForm(false)}>
            annuler
          </button>
        </div>
      </form>
      {/* <button onClick={handleVerifyDiploma}>Verify Diploma</button>
      <button onClick={handleMarkDiplomaObtained}>Mark Diploma Obtained</button> */}
    </FormModal>
  );
};

export default NoterEtudiant;

const FormModal = styled.div`
  width: 50vw;
  max-width: 800px; /* Set a maximum width if needed */
  /* height: auto; */
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
  }

  .form-modal label {
    display: block;
    margin-bottom: 10px;
  }

  .form-modal input {
    margin-left: 15px;
  }

  .form-modal button {
    margin-top: 10px;
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .form-modal button:hover {
    background-color: #45a049;
  }
`;
