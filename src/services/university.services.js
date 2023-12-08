import axios from "axios";

const UNIVERSITY_BASE_REST_API_URL = "/api/universities"; // Assuming the endpoint for universities is /api/universities

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

class UniversityServices {
  getAllUniversities() {
    const token = localStorage.getItem("token");
    return axios.get(UNIVERSITY_BASE_REST_API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  createUniversity(university) {
    return axios.post(UNIVERSITY_BASE_REST_API_URL, university);
  }

  getUniversityById(universityId) {
    return axios.get(UNIVERSITY_BASE_REST_API_URL + "/" + universityId);
  }

  updateUniversity(universityId, university) {
    return axios.put(
      UNIVERSITY_BASE_REST_API_URL + "/" + universityId,
      university
    );
  }

  deleteUniversity(universityId) {
    return axios.delete(UNIVERSITY_BASE_REST_API_URL + "/" + universityId);
  }
}

export default new UniversityServices();
