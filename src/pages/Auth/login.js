import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  // let navigate = useNavigate()

  // Attention ici mise en place de valeur par défaut pour travailler.
  // NE JAMAIS FAIRE CELA
  const [credentials, setCredentials] = useState({
    email: "eya.othmani99@gmail.com",
    password: "eya123",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(credentials);
    axios
      .post("http://localhost:8080/api/auth/", credentials)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    // <form onSubmit={onSubmit}>
    //   <div id="login" className="text-center">
    //     <div className="group">
    //       <label htmlFor="email">Login</label>
    //       <input
    //         type="text"
    //         name="email"
    //         value={credentials.email}
    //         onChange={onChange}
    //       />
    //     </div>
    //     <div className="group">
    //       <label htmlFor="password">Mot de passe</label>
    //       <input
    //         type="text"
    //         name="password"
    //         value={credentials.password}
    //         onChange={onChange}
    //       />
    //     </div>
    //     <div className="group">
    //       <button>login</button>
    //     </div>
    //   </div>
    // </form>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">Login</div>
            <div class="card-body">
              <form onSubmit={onSubmit}>
                <div class="mb-3">
                  <label for="username" class="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    name="username"
                    required
                    value={credentials.email}
                    onChange={onChange}
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    name="password"
                    required
                    value={credentials.password}
                    onChange={onChange}
                  />
                </div>
                <button type="submit" class="btn btn-primary">
                  Login
                </button>
              </form>
            </div>
            <h3>OR</h3>
            <Link to={"/register"}>
              <button className="btn btn-warning">Crée un Compte</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
