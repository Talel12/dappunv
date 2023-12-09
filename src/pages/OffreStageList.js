// OffreStageList.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffres } from "../redux/offreSlice";
import styled from "styled-components";

const StageOffersContainer = styled.div`
  max-width: 800px;
  margin: auto;
`;

const StageOffersList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;

const StageOfferCard = styled.li`
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

const OffreStageList = () => {
  const stageOffers = useSelector((store) => store?.offres?.offres);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOffres());
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleApply = (offreId) => {
    // Handle the apply button click, e.g., by navigating to an application form
    console.log(`Applying for offre with ID: ${offreId}`);
  };

  const filteredStageOffers = stageOffers.filter((offer) => {
    const searchRegex = new RegExp(searchTerm, "i");
    return (
      offer.type === "STAGE" &&
      (searchRegex.test(offer?.title) ||
        searchRegex.test(offer?.description) ||
        searchRegex.test(offer?.location) ||
        searchRegex.test(offer?.employer?.name))
    );
  });

  return (
    <StageOffersContainer>
      <h1>Les Offres de Stage</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <StageOffersList>
        {filteredStageOffers.map((offer) => (
          <StageOfferCard key={offer?.id}>
            <h3>{offer?.title}</h3>
            <p>{offer?.description}</p>
            <p>Location: {offer?.location}</p>
            {/* <p>Employer: {offer?.employer?.name}</p> */}
            <button onClick={() => handleApply(offer.id)}>Apply</button>
          </StageOfferCard>
        ))}
      </StageOffersList>
    </StageOffersContainer>
  );
};

export default OffreStageList;
