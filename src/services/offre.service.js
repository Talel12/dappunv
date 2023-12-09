import axios from "axios";

const OFFRE_BASE_REST_API_URL = "/api/offres"; // Assuming the endpoint for offres is /api/offres

class OffreService {
  getAllOffres() {
    const token = localStorage.getItem("token");
    return axios.get(OFFRE_BASE_REST_API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  createOffre = async (offre) => {
    const token = localStorage.getItem("token");
    return axios
      .post(`${OFFRE_BASE_REST_API_URL}/add`, offre, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error:", error);
        throw error;
      });
  };

  getOffreById(offreId) {
    const token = localStorage.getItem("token");
    return axios.get(`${OFFRE_BASE_REST_API_URL}/${offreId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  updateOffre(offreId, offre) {
    const token = localStorage.getItem("token");
    return axios.put(`${OFFRE_BASE_REST_API_URL}/update/${offreId}`, offre, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  deleteOffre(offreId) {
    const token = localStorage.getItem("token");
    return axios.delete(`${OFFRE_BASE_REST_API_URL}/delete/${offreId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new OffreService();
