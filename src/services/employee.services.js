import axios from "axios";

const USER_BASE_REST_API_URL = "/api/employers"; // Assuming the endpoint for employers is /api/employers

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

class EmployeeServices {
  getAllEmployees() {
    const token = localStorage.getItem("token");
    return axios.get(USER_BASE_REST_API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  createEmployee(user) {
    return axios.post(USER_BASE_REST_API_URL, user);
  }

  getEmployeeById(userId) {
    return axios.get(USER_BASE_REST_API_URL + "/" + userId);
  }

  updateEmployee(userId, user) {
    return axios.put(USER_BASE_REST_API_URL + "/" + userId, user);
  }

  deleteEmployee(userId) {
    return axios.delete(USER_BASE_REST_API_URL + "/" + userId);
  }
}

export default new EmployeeServices();
