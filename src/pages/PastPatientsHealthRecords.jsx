import React, { useEffect, useState, useContext } from "react";
import NavBar from "../component/Navbar";
import PatientCard from "../component/PatientCard";
import { useNavigate } from "react-router-dom";
import routes from "../Router/routes";
import { UserContext } from "../contexts/UserContext";
import { alertMsg, baseURL, endPoints, oneDayInMillis } from "../constans";

const PastPatientHealthRecords = () => {
  const patients = {};
  const patientHR = {};

  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [patientList, setPatientList] = useState({});
  const [healthRecords, setHealthRecords] = useState({});

  // const { user } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("user"));

  const prepare = (_data) => {
    _data.forEach((obj) => {
      const { citizen } = obj;
      patients[citizen["uhId"]] = citizen;
      let hrs = patientHR.hasOwnProperty(citizen["uhId"])
        ? patientHR[citizen["uhId"]]
        : [];
      hrs.push(obj);
      patientHR[citizen["uhId"]] = hrs;
    });
    setPatientList(patients);
    setHealthRecords(patientHR);
  };

  const handleShowRecords = (hrs) => {
    navigate(routes.PatientHR, { state: { hrs } });
  };

  const fetchData = (_startDate, _endDate) => {
    debugger;
    fetch(
      baseURL + endPoints["DOCTOR_FETCH_PAST_PATIENTS_HRS"] + user["loginId"],
      {
        method: "POST",
        body: JSON.stringify({
          startDate: _startDate,
          endDate: _endDate,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization:
            localStorage.getItem("token") &&
            localStorage.getItem("token").toString(),
        },
      }
    )
      .then((res) => {
        if (res.status === 200) return res.json();
        throw res;
      })
      .then((_data) => {
        prepare(_data[0]);
      })
      .catch((e) => {
        alert(alertMsg["SOMETHING_WENT_WRONG"]);
        console.error(e);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData(
      new Date(new Date().valueOf() - oneDayInMillis * 10)
        .toISOString()
        .split("T")[0],
      new Date().toISOString().split("T")[0]
    );
  }, []);

  return (
    <div>
      <NavBar showBackButton={true} />
      <h2 style={{ textAlign: "center", margin: 0, marginTop: "5px" }}>
        Past Patients Health Records
      </h2>
      <div style={{ textAlign: "center" }}>
        <h3 style={{ marginBottom: 0 }}>Select Time Period</h3>
        <p style={{ marginTop: "0" }}>
          it will show all the patient's records registered during this period
          (default last 10 days)
        </p>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="startDate">Start Date : </label>
          <input
            name="startDate"
            type="date"
            value={startDate}
            max={new Date().toISOString().split("T")[0]}
            required
            onChange={(e) => {
              setEndDate("");
              setStartDate(e.target.value);
            }}
          />
          <label style={{ marginLeft: "2%" }} htmlFor="endDate">
            End Date :{" "}
          </label>
          <input
            name="endDate"
            type="date"
            disabled={startDate === ""}
            value={endDate}
            min={startDate}
            // max={new Date().toISOString().split("T")[0]}
            required
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button
            style={{
              marginLeft: "10px",
              fontSize: "16px",
              padding: "4px",
              fontWeight: "bold",
              border: "1px solid",
              cursor: "pointer",
              borderRadius: "5px",
              backgroundColor: "rgba(255,255,255,1)",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
            disabled={startDate === "" || endDate === ""}
            onClick={(e) => fetchData(startDate, endDate)}
          >
            search
          </button>
        </form>
      </div>
      {loading ? (
        <h2 style={{ textAlign: "center", marginTop: "10%" }}>
          Fetching Data....
        </h2>
      ) : (
        <div
          className="patientListContainer"
          style={{
            display: "flex",
            alignContent: "center",
            flexWrap: "wrap",
            marginTop: "1%",
            height: "65vh",
            overflowY: "auto",
            scrollbarWidth: "none",
            flexDirection: "column",
          }}
        >
          {Object.keys(patientList).length === 0 ? (
            <h2 style={{ textAlign: "center", marginTop: "10%" }}>
              No patient registered in search period
            </h2>
          ) : (
            Object.keys(patientList).map((key) => {
              const { dob, fname, lname, gender, uhId } = patientList[key];
              return (
                <div key={uhId} style={{ margin: "10px" }}>
                  <PatientCard
                    age={dob}
                    name={fname + " " + lname}
                    gender={gender}
                    buttonName="show records"
                    handler={(e) => handleShowRecords(healthRecords[uhId])}
                  />
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default PastPatientHealthRecords;
