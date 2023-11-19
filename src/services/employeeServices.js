import axios from "axios";

const USER_BASE_REST_API_URL = "http://localhost:8080/api";

class userServices {
  getAllEmployees() {
    return axios.get(USER_BASE_REST_API_URL);
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

export default new userServices();
