import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css"
const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform registration logic here with formData
    console.log("Registration Data:", formData);
    // Reset form fields after submission if needed
    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <main>
    <div class="containeer ">
    <div className="row justify-content-center">
    
  <div className="col-md-6">
    
    <div className="card">
     
      <div className="card-header"> <h1 >Register</h1> </div>
      <div className="card-body">
          
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label
                    style={{ float: "none" }}
                    htmlFor="role"
                    className="form-label"
                  >
                    Role
                  </label>
                  <select
                    className="form-select"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="employee">Employee</option>
                    <option value="etudiant">Etudiant</option>
                  </select>
                </div>
                <div></div>
                <div className="mb-3">
                  <label
                    style={{ float: "unset" }}
                    htmlFor="email"
                    className="form-label"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btnn">
                  Register
                </button>
              </form>
            </div>
            <h3>OU</h3>
            <Link to={"/login"}>
              <button className="boot">Login</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
   </main>
  );
};

export default Register;
