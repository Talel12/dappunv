import React, { useState, useEffect } from "react";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import Home from "./pages/Home/Home";
import Navigation from "./components/navigation";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import AddEmployee from "./pages/Employee/AddEmployee";
import Employee from "./pages/Employee";
import Login from "./pages/Auth/login";
import Register from "./pages/Auth/Register";
import Admin from "./pages/Admin";
import Director from "./pages/Director";
import Etudiant from "./pages/Etudiant";
import AddEtudiant from "./pages/Etudiant/AddEtudiant";
import Offrestage  from "./pages/Employee/offrestage";
export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <Navigation />
      <div className="safe-area">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route
            path="/"
            element={<Home landingPageData={landingPageData} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/offres" element={<Offrestage />} />
          <Route path="/register" element={<Register />} />

          <Route path="/employee" element={<Employee />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/director" element={<Director />} />
          <Route path="/etudiant" element={<Etudiant />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/add-etudiant" element={<AddEtudiant />} />
          {/* <Route path="/employee/add-employee" element={<AddEmployee />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
