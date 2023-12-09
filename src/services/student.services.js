import axios from "axios";

const STUDENT_BASE_REST_API_URL = "/api/students"; // Assuming the endpoint for students is /api/students

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

class StudentServices {
  getAllStudents() {
    const token = localStorage.getItem("token");
    return axios.get(STUDENT_BASE_REST_API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  createStudent(student) {
    return axios.post(STUDENT_BASE_REST_API_URL, student);
  }

  getStudentById(studentId) {
    return axios.get(STUDENT_BASE_REST_API_URL + "/" + studentId);
  }

  updateStudent(studentId, student) {
    const token = localStorage.getItem("token");

    return axios.put("/api/student/update" + "/" + studentId, student, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteStudent(studentId) {
    return axios.delete(STUDENT_BASE_REST_API_URL + "/" + studentId);
  }
}

export default new StudentServices();
