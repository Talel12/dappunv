import axios from "axios";

const USER_BASE_REST_API_URL = "http://localhost:8080/api/";

class userServices {
  getAllusers() {
    const token = localStorage.getItem("token");
    return axios.get(USER_BASE_REST_API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  createuser(user) {
    return axios.post(USER_BASE_REST_API_URL, user);
  }

  getuserById(userId) {
    return axios.get(USER_BASE_REST_API_URL + "/" + userId);
  }

  updateuser(userId, user) {
    return axios.put(USER_BASE_REST_API_URL + "/" + userId, user);
  }

  deleteuser(userId) {
    return axios.delete(USER_BASE_REST_API_URL + "/" + userId);
  }
}

export default new userServices();
