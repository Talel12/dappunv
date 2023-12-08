import axios from "axios";

const DIRECTOR_BASE_REST_API_URL = "/api/directors"; // Assuming the endpoint for directors is /api/directors

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

class DirectorServices {
  getAllDirectors() {
    const token = localStorage.getItem("token");
    return axios.get(DIRECTOR_BASE_REST_API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  createDirector(director) {
    return axios.post(DIRECTOR_BASE_REST_API_URL, director);
  }

  getDirectorById(directorId) {
    return axios.get(DIRECTOR_BASE_REST_API_URL + "/" + directorId);
  }

  updateDirector(directorId, director) {
    return axios.put(DIRECTOR_BASE_REST_API_URL + "/" + directorId, director);
  }

  deleteDirector(directorId) {
    return axios.delete(DIRECTOR_BASE_REST_API_URL + "/" + directorId);
  }
}

export default new DirectorServices();
