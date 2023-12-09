import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "/api/auth/";

const register = (username, email, password, role) => {
  return axios.post(API_URL + "registration", {
    username,
    role,
    email,
    password,
  });
};

const login = ({ username, password }) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data && response.data.token) {
        const token = response.data.token;
        localStorage.setItem("token", token);

        // Decode the token to get user information, including role
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.roles;
      }
      return response.data;
    });
};

// Fetch the current user
const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.sub;
    const user = await axios
      .get(`/api/auth/users/${jwtDecode(token).sub}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // redirectBasedOnRole(userRole);
        return res.data[0];
        // Redirect based on user role
      });
    return user;
  }
  return null;
};

// Function to redirect based on user role
export const redirectBasedOnRole = (userRole) => {
  switch (userRole) {
    case "admin":
      // Redirect to admin page
      window.location.href = "/admin";
      break;
    case "etudiant":
      // Redirect to etudiant page
      window.location.href = "/etudiant";
      break;
    case "employeur":
      // Redirect to employee page
      window.location.href = "/employee";
      break;
    case "directeur":
      // Redirect to employee page
      window.location.href = "/director";
      break;
    default:
      // Redirect to a default page if the role is not recognized
      window.location.href = "/default";
  }
};

const AuthService = {
  register,
  login,
  getCurrentUser, // Add this line
};

export default AuthService;
