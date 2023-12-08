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
import Offrestage from "./pages/Employee/offrestage";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./redux/authSlice";
import { UploadFileToIPFSView } from "./pages/UploadFile";

import Web3 from "web3";
import RedirectProfil from "./components/RedirectProfil";
import IpfsPreviewer from "./pages/IpfsPreview";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const dispatch = useDispatch();
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    dispatch(fetchCurrentUser());
    setLandingPageData(JsonData);
  }, [dispatch]);
  const [state, setState] = useState({});
  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:9545");
    const accounts = await web3.eth.getAccounts();
    setState({ account: accounts[0] });
    // const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
    // setState({ todoList });
    // const taskCount = await todoList.methods.taskCount().call();
    // setState({ taskCount });
    // for (var i = 1; i <= taskCount; i++) {
    //   const task = await todoList.methods.tasks(i).call();
    //   setState({
    //     tasks: [...state.tasks, task],
    //   });
    // }
  };

  return (
    <div>
      <Navigation />
      <div className="safe-area">
        {/* <h1>{state?.account}</h1> */}
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route
            path="/"
            element={<Home landingPageData={landingPageData} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/offres" element={<Offrestage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/redirect-profil" element={<RedirectProfil />} />
          <Route path="/IpfsPreviewer" element={<IpfsPreviewer />} />

          <Route
            path="/uploadipfs"
            element={<UploadFileToIPFSView account={state.account} />}
          />
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
