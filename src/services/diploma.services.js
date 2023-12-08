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

  createDiploma = async (diploma) => {
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Log the token to the console for debugging
    return axios
      .post("http://localhost:8080/api/diploma/add", diploma, {
        headers: {
          Authorization: `Bearer ${token}`,
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
    return axios.get("http://localhost:8080/api/diploma/" + diplomaId, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  updateDiploma(diplomaId, diploma) {
    return axios.put(DIPLOMA_BASE_REST_API_URL + "/" + diplomaId, diploma);
  }

  deleteDiploma(diplomaId) {
    return axios.delete(DIPLOMA_BASE_REST_API_URL + "/" + diplomaId);
  }
}

export default new DiplomaServices();
