import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditEmployee = () => {
  const [jobTitleList, setJobTitleList] = useState([]);
  const [payGradeList, setPayGradeList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [supervisorList, setSupervisorList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const maritalStatusOptions = ["Un-Married", "Married", "Divorced", "Widowed"];
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const genderList = ["Male", "Female"];

  useEffect(() => {
    const fetchJobTitleList = async () => {
      const response = await axios.get("http://localhost:5001/api/jobTitle");
      console.log(response.data);
      setJobTitleList(response.data.map((item) => item.Job_Title));
    };
    fetchJobTitleList();

    const fetchStatusList = async () => {
      const response2 = await axios.get("http://localhost:5001/api/status");
      console.log(response2.data);
      setStatusList(response2.data.map((item) => item.Status_Type));
    };
    fetchStatusList();

    const fetchPayGradeList = async () => {
      const response1 = await axios.get("http://localhost:5001/api/payGrade");
      console.log(response1.data);
      setPayGradeList(response1.data.map((item) => item.Pay_Grade));
    };
    fetchPayGradeList();

    const fetchBranchList = async () => {
      const response = await axios.get("http://localhost:5001/api/branch");
      console.log(response.data);
      setBranchList(response.data.map((item) => item.Branch_Name));
    };
    fetchBranchList();

    const DepartmentList = async () => {
      const response = await axios.get("http://localhost:5001/api/department");
      console.log(response.data);
      setDepartmentList(response.data.map((item) => item.Department_Name));
    };
    DepartmentList();
  }, []);

  //get informations of relavent employee
  const [record, setRecord] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/employeeInfo/employee"
        );
        const data = await response.json();
        console.log(data);
        console.log("Data fetched from server");
        setRecord(data[0]);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchdata();
  }, []);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    console.log("Form submitted:", {
      employeeId: record.Employee_ID,
    });
  };

  useEffect(() => {
    const sendEditedDataToServer = async () => {
      try {
        if (formSubmitted) {
          const response = await fetch(
            "http://localhost:5001/api/ManUI/EditPI/edited",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                Name: record.Name,
                Branch_Name: record.Branch_Name,
                Birthday: record.Birthday,
                ContactNumber: record.ContactNumber,
                MaritalStatus: record.MaritalStatus,
                Job_Title: record.Job_Title,
                Status: record.Status,
                PayGrade: record.PayGrade,
                Supervisor: record.Supervisor_Name,
                Department: record.Department,
                Gender: record.Gender,
              }),
            }
          );

          if (response.ok) {
            console.log("Edited Data sent to server:");
          } else {
            console.log("Data not sent to server");
          }

          setFormSubmitted(false);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    sendEditedDataToServer();
  }, [formSubmitted]);

  useEffect(() => {
    const SupervisorList = async () => {
      const response = await axios.post(
        "http://localhost:5001/api/supervisorList",
        { jobTitle: jobTitle }
      );
      console.log(response.data);
      setSupervisorList(response.data.map((item) => item.Name));
    };
    SupervisorList();
  }, [jobTitle]);

  return (
    <div className="d-flex flex-column align-items-center gradient-bg bg-primary vh-100">
      <h1 style={{ marginBottom: "20px", marginTop: "20px" }}>
        Personal Informations
      </h1>
      <form onSubmit={handleSubmit}>
        <label className="mb-3">
          Name:
          <input
            type="text"
            value={record.Name}
            onChange={(e) => setRecord({ ...record, Name: e.target.value })}
            style={{ marginLeft: "10px" }}
          />
        </label>
        <br />

        <label className="mb-3">
          Birthday:
          <input
            type="date"
            value={
              record.Birthday
                ? new Date(record.Birthday).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) => setRecord({ ...record, Birthday: e.target.value })}
            style={{ marginLeft: "10px" }}
          />
        </label>
        <br />

        <label className="mb-3">
          Gender:
          <select
            value={record.Gender}
            onChange={(e) => {
              setRecord({ ...record, Gender: e.target.value });
            }}
            style={{ marginLeft: "10px" }}
          >
            <option value="">{record.Gender}</option>
            {genderList.map((gender, index) => (
              <option key={index} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label className="mb-3">
          Branch:
          <select
            value={record.Branch_Name}
            onChange={(e) => {
              setRecord({ ...record, Branch_Name: e.target.value });
            }}
            style={{ marginLeft: "10px" }}
          >
            <option value="">{record.Branch_Name}</option>
            {branchList.map((branch, index) => (
              <option key={index} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label className="mb-3">
          Department:
          <select
            value={record.Department}
            onChange={(e) => {
              setRecord({ ...record, Department: e.target.value });
            }}
            style={{ marginLeft: "10px" }}
          >
            <option value="">{record.Department}</option>
            {departmentList.map((department, index) => (
              <option key={index} value={department}>
                {department}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label className="mb-3">
          Contact Number:
          <input
            type="tel"
            value={record.Emergency_contact_Number}
            onChange={(e) =>
              setRecord({ ...record, Emergency_contact_Number: e.target.value })
            }
            style={{ marginLeft: "10px" }}
          />
        </label>
        <br />

        <label className="mb-3">
          Marital Status:
          <select
            value={record.Marital_status}
            onChange={(e) =>
              setRecord({ ...record, Marital_status: e.target.value })
            }
            style={{ marginLeft: "10px" }}
          >
            <option value="">{record.Marital_status}</option>
            {maritalStatusOptions.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label className="mb-3">
          Job Title:
          <select
            value={record.Job_Title}
            onChange={(e) => {
              setRecord({ ...record, Job_Title: e.target.value });
              setJobTitle(e.target.value);
            }}
            style={{ marginLeft: "10px" }}
          >
            <option value=""></option>
            {jobTitleList.map((jobTitle, index) => (
              <option key={index} value={jobTitle}>
                {jobTitle}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label className="mb-3">
          Status:
          <select
            value={record.Status_Type}
            onChange={(e) =>
              setRecord({ ...record, Status_Type: e.target.value })
            }
            style={{ marginLeft: "10px" }}
          >
            <option value="">{record.Status_Type}</option>
            {statusList.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label className="mb-3">
          Pay Grade:
          <select
            value={record.Pay_Grade}
            onChange={(e) =>
              setRecord({ ...record, Pay_Grade: e.target.value })
            }
            style={{ marginLeft: "10px" }}
          >
            <option value="">{record.Pay_Grade}</option>
            {payGradeList.map((payGrade, index) => (
              <option key={index} value={payGrade}>
                {payGrade}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label className="mb-3">
          Supervisor:
          <select
            value={record.Supervisor_Name}
            onChange={(e) =>
              setRecord({ ...record, Supervisor_Name: e.target.value })
            }
            style={{ marginLeft: "10px" }}
          >
            <option value="">{record.Supervisor_Name}</option>
            {supervisorList.map((supervisor, index) => (
              <option key={index} value={supervisor}>
                {supervisor}
              </option>
            ))}
          </select>
        </label>

        <br />
        <button
          onClick={goBack}
          type="button"
          className="btn btn-primary"
          style={{
            color: "white",
            fontSize: "16px",
            marginRight: "50px",
            marginTop: "20px",
          }}
        >
          Back
        </button>
        <button
          className="btn btn-primary"
          type="submit"
          value="Submit"
          style={{ marginTop: "20px" }}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
