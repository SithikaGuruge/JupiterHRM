import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const PersonalInfo = () => {
  const [column, setColumn] = useState([]);
  const [record, setRecord] = useState([]);
  var edit = false;
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetch("http://localhost:5001/api/personalInfo")
      .then((response) => response.json())
      .then((data) => {
        setColumn(Object.keys(data[0]));
        setRecord(data[0]);
      })
      .catch((error) => console.error("Error fetching data2:", error));
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/login/Employee" className="navbar-brand">
            Logout
          </Link>
        </div>
      </nav>

      <div className="d-flex flex-column align-items-center gradient-bg bg-primary vh-100">
        <h1 style={{ marginBottom: "20px", marginTop: "20px" }}>
          Personal Informations
        </h1>

        <div
          style={{
            border: "2px solid black",
            padding: "20px",
            marginTop: "50px",
            marginBottom: "50px",
            borderRadius: "10px",
            width: "45%",
            display: "flex",
            flexDirection: "column", // Align children vertically
            alignItems: "center", // Center children horizontally
            // Center children horizontally
          }}
        >
          <h5>Employee ID : {record.Employee_ID}</h5>
          <h5>Name : {record.Name}</h5>
          <h5>Birthdate : {new Date(record.Birthday).toLocaleDateString()}</h5>
          <h5>Marital Status : {record.Marital_status}</h5>
          <h5>Emergency Contact Number : {record.Emergency_contact_Number}</h5>
          <h5>Status Type : {record.Status_Type}</h5>
          <h5>Job Title : {record.Job_Title}</h5>
          <h5>Pay Grade : {record.Pay_Grade}</h5>
          {record.Supervisor_Name !== null && (
            <h5>Supervisor_Name: {record.Supervisor_Name}</h5>
          )}
          {record.Job_Title === "HR Manager" && (edit = true)}
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={goBack}
            type="button"
            className="btn btn-primary"
            style={{
              color: "white",
              fontSize: "16px",
            }}
          >
            Back
          </button>

          {edit && (
            <Link to="/login/Employee/ManUI/EditPI">
              <button
                className="btn btn-primary"
                style={{
                  color: "white",
                  fontSize: "16px",
                  marginLeft: "50px",
                }}
              >
                Edit
              </button>
            </Link>
          )}
        </div>
      </div>

      {column == null && <p>Loading....</p>}
    </div>
  );
};

export default PersonalInfo;
