import React from "react";
import { Link } from "react-router-dom";

const Stage = () => {
  // Dummy data for internship offers
  const internshipOffers = [
    {
      id: 1,
      title: "Stage Développement Mobile",
      company: "Mobile Tech",
      location: "Lille",
      description:
        "Opportunité de stage pour un développeur mobile passionné. Travailler sur des projets innovants avec React Native.",
    },
    {
      id: 2,
      title: "Stage Marketing Digital",
      company: "Digital Agency",
      location: "Bordeaux",
      description:
        "Stage de marketing digital avec un accent sur les médias sociaux, la gestion de contenu et l'analyse des performances.",
    },
    {
      id: 3,
      title: "Stage Design UX/UI",
      company: "Design Studio",
      location: "Strasbourg",
      description:
        "Recherche de stagiaire en design UX/UI pour contribuer à la création d'interfaces utilisateur intuitives et esthétiques.",
    },
    {
      id: 4,
      title: "Stage Finance et Comptabilité",
      company: "Finance Consulting",
      location: "Nice",
      description:
        "Stage dans le domaine de la finance et de la comptabilité. Participation à la gestion des finances et des rapports financiers.",
    },
    // Add more internship offers as needed
  ];

  return (
    <div>
      <h1 style={{ textAlign: "center", paddingTop: 50 }}>Offre de stage</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {internshipOffers.slice(0, 3).map((internship) => (
          <div key={internship.id} style={styles.internshipCard}>
            <h3>{internship.title}</h3>
            <p>{internship.company}</p>
            <p>{internship.location}</p>
            <p>{internship.description}</p>
          </div>
        ))}
      </div>
      <Link to="/all-internships" style={styles.readAllButton}>
        Lire Tout
      </Link>
    </div>
  );
};

const styles = {
  internshipCard: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    margin: "16px",
    maxWidth: "300px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  readAllButton: {
    width: "fit-content",
    marginTop: "30px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    cursor: "pointer",
    display: "block",
    margin: "auto",
  },
};

export default Stage;
