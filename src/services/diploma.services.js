import axios from "axios";

const DIPLOMA_BASE_REST_API_URL = "/api/diplomas"; // Assuming the endpoint for diplomas is /api/diplomas

// Set up a global axios interceptor to add the Bearer token to all requests
// axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

class DiplomaServices {
  getAllDiplomas() {
    const token = localStorage.getItem("token");
    return axios.get(DIPLOMA_BASE_REST_API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  createDiploma = async ({ data, student }) => {
    const token = localStorage.getItem("token");
    // console.log("Token:", token); // Log the token to the console for debugging
    return axios
      .post(`/api/diploma/add/${student}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Response:", response.data); // Log the response for debugging
        return response;
      })
      .catch((error) => {
        console.error("Error:", error); // Log any errors for debugging
        throw error;
      });
  };

  getDiplomaById(diplomaId) {
    const token = localStorage.getItem("token");
    return axios.get("/api/diploma/" + diplomaId, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  updateDiploma({ diplomaId, diploma }) {
    const token = localStorage.getItem("token");
    console.log(diploma);
    return axios.put("/api/diploma/update/" + diplomaId, diploma, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  deleteDiploma(diplomaId) {
    console.log(diplomaId);
    const token = localStorage.getItem("token");
    return axios.delete("/api/diploma/delete/" + diplomaId, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new DiplomaServices();
