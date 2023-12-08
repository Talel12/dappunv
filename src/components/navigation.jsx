import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { useDispatch } from "react-redux";

const Navigation = (props) => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <Link className="navbar-brand page-scroll" to="/">
            Home
          </Link>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul
            className="nav navbar-nav navbar-right"
            style={{ alignItems: "center", display: "flex" }}
          >
            <li>
              <a href="/#features" className="page-scroll">
                Offre d'emploi
              </a>
            </li>
            <li>
              <a href="/#about" className="page-scroll">
                Offre de Stage
              </a>
            </li>

            {/* <li>
              <a href="/#login" className="page-scroll">
                Espace Externet
              </a>
            </li>
            <li>
              <a href="/#contact" className="page-scroll">
                Contact
              </a>
            </li> */}
            <li>
              <a href="/IpfsPreviewer" className="page-scroll">
                Verifier Diplome
              </a>
            </li>

            <li>
              {!token ? (
                <Link to={"/login"}>
                  <button className="btn btn-success">Login</button>
                </Link>
              ) : (
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <Link to={"/redirect-profil"}>
                    <button className="btn btn-success">Profil</button>
                  </Link>

                  <button className="btn" onClick={() => dispatch(logout())}>
                    Deconnecter
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
