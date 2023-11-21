import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./login.css"

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
    <main>
    <div class="containeer ">
    <div className="row justify-content-center">
    
  <div className="col-md-6">
    
    <div className="card">
     
      <div className="card-header"> <h1 className="titl">Login</h1> </div>
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control" // Adjust this class to control the width
              id="username"
              name="username"
              required
              value={credentials.email}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control" // Adjust this class to control the width
              id="password"
              name="password"
              required
              value={credentials.password}
              onChange={onChange}
            />
          </div>
         
          <button type="submit" className="btnn">
            Login
          </button>
        
        </form>
       
      </div>
      <h3 className="greyh">OU</h3>
      <Link to={"/register"}>
        <button className="boot">Crée un Compte</button>
      </Link>
    </div>
 
  </div>
 
</div>


    </div>


       
   


    </main>
  );
};

export default Login;
