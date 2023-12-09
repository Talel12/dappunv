// OffreEmploiList.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffres } from "../redux/offreSlice";
import styled from "styled-components";
import axios from "axios";
import AddOffreForm from "./AddOffreForm";

const JobOffersContainer = styled.div`
  max-width: 800px;
  margin: auto;
`;

const JobOffersList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;

const JobOfferCard = styled.li`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  width: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: 8px;
    font-size: 1.2em;
  }

  p {
    margin: 0;
    color: #555;
  }

  button {
    background-color: #4caf50;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const OffreEmploiList = () => {
  const jobOffers = useSelector((store) => store?.offres?.offres);
  const currentUser = useSelector((store) => store?.auth?.user);
  const token = localStorage.getItem("token");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddOffreModal, setShowAddOffreModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOffres());
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddOffre = async (values) => {
    try {
      // Send the form data to your backend API
      const response = await fetch("/api/offres/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include your authorization header if needed
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        console.log("Offre added successfully");
        // Optionally, handle success (e.g., show a success message)
      } else {
        console.error("Failed to add offre");
        // Optionally, handle failure (e.g., show an error message)
      }
    } catch (error) {
      console.error("Error adding offre:", error);
      // Handle other errors (e.g., network issues)
    }
  };

  const handleApply = async (offreId) => {
    try {
      const response = await axios.post(
        `/api/offres/${offreId}/apply`,
        {
          student: currentUser?.id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Application successful:", response.data);
      // Optionally, update your local state to reflect the application status
    } catch (error) {
      console.error("Error applying:", error);
      // Handle the error (show a message to the user, etc.)
    }
  };

  const filteredJobOffers = jobOffers.filter((offer) => {
    const searchRegex = new RegExp(searchTerm, "i");
    return (
      offer.type === "EMPLOI" &&
      (searchRegex.test(offer?.title) ||
        searchRegex.test(offer?.description) ||
        searchRegex.test(offer?.location) ||
        searchRegex.test(offer?.employer?.name))
    );
  });

  const onRequestClose = () => setShowAddOffreModal(false);

  return (
    <JobOffersContainer>
      <AddOffreForm
        isOpen={showAddOffreModal}
        onRequestClose={onRequestClose}
        onSubmit={handleAddOffre}
      />
      <h1>Les Offres d'emplois</h1>
      <button onClick={() => setShowAddOffreModal(true)}>
        Ajouter une offre d'emploi
      </button>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <JobOffersList>
        {filteredJobOffers.map((offer) => (
          <JobOfferCard key={offer?.id}>
            <h3>{offer?.title}</h3>
            <p>{offer?.description}</p>
            <p>Location: {offer?.location}</p>
            <p>Salary: {offer?.salary}</p>
            {/* <p>Employer: {offer?.employer?.name}</p> */}
            <button onClick={() => handleApply(offer.id)}>Apply</button>
          </JobOfferCard>
        ))}
      </JobOffersList>
    </JobOffersContainer>
  );
};

export default OffreEmploiList;
