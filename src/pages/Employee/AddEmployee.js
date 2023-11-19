import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import userServices from "../../services/userServices";

const AddEmployee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateNaissance, setdateNaissance] = useState("");
  const [CIN, setCIN] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    const Employee = {
      firstName,
      lastName,
      dateNaissance,
      CIN,
      phoneNumber,
      emailId,
    };

    if (id) {
      userServices
        .updateuser(id, Employee)
        .then((response) => {
          navigate("/employee");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      userServices
        .createuser(Employee)
        .then((response) => {
          console.log(response.data);
          navigate("/employee");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    userServices
      .getuserById(id)
      .then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setdateNaissance(response.data.dateNaissance);
        setphoneNumber(response.data.phoneNumber);
        setCIN(response.data.CIN);
        setEmailId(response.data.emailId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const title = () => {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  };

  return (
    <div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {title()}
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label"> First Name :</label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    name="firstName"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Last Name :</label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    name="lastName"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> dateNaissance :</label>
                  <input
                    type="text"
                    placeholder="Enter dateNaissance"
                    name="dateNaissance"
                    className="form-control"
                    value={dateNaissance}
                    onChange={(e) => setdateNaissance(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> CIN :</label>
                  <input
                    type="text"
                    placeholder="Enter CIN"
                    name="CIN "
                    className="form-control"
                    value={CIN}
                    onChange={(e) => setCIN(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Email Id :</label>
                  <input
                    type="email"
                    placeholder="Enter email Id"
                    name="emailId"
                    className="form-control"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                  ></input>
                  <div className="form-group mb-2">
                    <label className="form-label"> phoneNumber :</label>
                    <input
                      type="text"
                      placeholder="Enter phoneNumber"
                      name="phoneNumber"
                      className="form-control"
                      value={phoneNumber}
                      onChange={(e) => setphoneNumber(e.target.value)}
                    ></input>
                  </div>
                </div>

                <button
                  className="btn btn-success"
                  onClick={(e) => saveOrUpdateEmployee(e)}
                >
                  Submit{" "}
                </button>
                <Link to="/employee" className="btn btn-danger">
                  {" "}
                  Cancel{" "}
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
