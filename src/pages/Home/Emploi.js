import React from "react";
import { Link } from "react-router-dom";

const Emploi = () => {
  // Dummy data for job offers
  const jobOffers = [
    {
      id: 1,
      title: "Développeur Web",
      company: "Tech Solutions",
      location: "Paris",
      description:
        "Recherche un développeur web expérimenté pour rejoindre notre équipe. Expérience avec React et Node.js souhaitée.",
    },
    {
      id: 2,
      title: "Graphiste Junior",
      company: "Design Studio",
      location: "Lyon",
      description:
        "Opportunité pour un graphiste créatif et passionné. Travailler sur des projets de conception graphique et d'illustration.",
    },
    {
      id: 3,
      title: "Ingénieur DevOps",
      company: "Cloud Innovations",
      location: "Toulouse",
      description:
        "Rejoignez notre équipe en tant qu'ingénieur DevOps. Expérience avec Docker, Kubernetes et CI/CD appréciée.",
    },
    {
      id: 4,
      title: "Chef de Projet Marketing",
      company: "Digital Marketing Agency",
      location: "Marseille",
      description:
        "Nous recherchons un chef de projet marketing dynamique pour gérer les campagnes publicitaires et les stratégies marketing.",
    },
    // Add more job offers as needed
  ];

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Offre d'emploi</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {jobOffers.map((job) => (
          <div key={job.id} style={styles.jobCard}>
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>{job.description}</p>
          </div>
        ))}
      </div>
      <Link to="/all-jobs" style={styles.readAllButton}>
        Lire Tout
      </Link>
    </div>
  );
};

const styles = {
  jobCard: {
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

export default Emploi;
