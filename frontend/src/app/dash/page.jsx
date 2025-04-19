"use client";
// import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import "./style.css";
import axios from "axios";
import Cookies from "js-cookie";

export default function Dash() {
  const [formData, setFormData] = useState({});
  const DEFAULT_PRICE = "$8,432.50";
  const [price, setPrice] = useState(null);
  const [hisData, setHisData] = useState([]);
  const historyRef = useRef(null);
  const [userProfile, setUserProfile] = useState();

  const handleHistoryRef = () => {
    if (historyRef.current)
      historyRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle prediction request
  const handlePrediction = async (e) => {
    e.preventDefault();
    try {
      const access_token = Cookies.get("access_token");
      // Send formData to the backend for prediction
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/predict`,
        formData,
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
      console.log(response);

      if (response && response.data) {
        setPrice(response.data);
      } else {
        console.error("Unexpected response format:", response);
        alert("Failed to retrieve prediction. Please try again.");
      }
    } catch (error) {
      console.error("Error during prediction request:", error);
      alert(
        "An error occurred while processing your prediction request. Please check your input and try again."
      );
    }
  };

  useEffect(() => {
    const access_token = Cookies.get("access_token");
    console.log("Access Token:", access_token);

    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/userdata`, // API endpoint
          {}, // Empty body for the POST request
          {
            headers: { Authorization: `Bearer ${access_token}` }, // Headers
          }
        );
        console.log("Response:", response.data?.message);
        console.log("profile:", response.data?.user_profile);
        console.log("history:", response.data?.user_histroy);

        const theData = response.data?.user_history;
        const userpro = [response.data?.user_profile];

        setUserProfile(userpro);
        setHisData(theData);
      } catch (error) {
        console.error(
          "Error fetching user data:",
          error.response?.data || error
        );
        alert("Failed to fetch user data. Please try again.");
      }
    };

    fetchData();
  }, []);

  return (
    <div id="dashboard-page" className="hidden">
      <main>
        <div className="container">
          <div className="dashboard">
            <div className="sidebar">
              <div className="sidebar-header">
                <div>
                  {userProfile &&
                  Array.isArray(userProfile) &&
                  userProfile.length > 0 ? (
                    <>
                      <h3>{userProfile[0].user_name}</h3>
                      <p>{userProfile[0].user_email}</p>
                    </>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>

              <ul className="sidebar-menu">
                <li>
                  <a href="#" className="active">
                    Diamond Prediction
                  </a>
                </li>
                <li>
                  <a href="#" onClick={handleHistoryRef}>
                    Prediction History
                  </a>
                </li>
              </ul>
            </div>

            <div className="main-content">
              <div className="dashboard-header">
                <h2 className="dashboard-title">Diamond Value Prediction</h2>
                <button className="btn btn-outline" onClick={handleHistoryRef}>
                  View History
                </button>
              </div>

              <form className="diamond-form" onSubmit={handlePrediction}>
                <div className="form-group">
                  <label htmlFor="carat">Carat Weight</label>
                  <input
                    type="number"
                    className="form-control"
                    id="carat"
                    placeholder="e.g. 1.5"
                    step="0.01"
                    min="0.1"
                    onChange={handleChange}
                    name="carat"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cut">Cut Quality</label>
                  <select
                    className="form-control"
                    id="cut"
                    defaultValue=""
                    onChange={handleChange}
                    name="cut"
                  >
                    <option value="" disabled>
                      Select cut quality
                    </option>
                    <option value="fair">Fair</option>
                    <option value="good">Good</option>
                    <option value="very-good">Very Good</option>
                    <option value="premium">Premium</option>
                    <option value="ideal">Ideal</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="color">Color Grade</label>
                  <select
                    className="form-control"
                    id="color"
                    defaultValue=""
                    onChange={handleChange}
                    name="color"
                  >
                    <option value="" disabled>
                      Select color grade
                    </option>
                    <option value="d">D (Colorless)</option>
                    <option value="e">E (Colorless)</option>
                    <option value="f">F (Colorless)</option>
                    <option value="g">G (Near Colorless)</option>
                    <option value="h">H (Near Colorless)</option>
                    <option value="i">I (Near Colorless)</option>
                    <option value="j">J (Near Colorless)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="clarity">Clarity</label>
                  <select
                    className="form-control"
                    id="clarity"
                    defaultValue=""
                    onChange={handleChange}
                    name="clarity"
                  >
                    <option value="" disabled>
                      Select clarity grade
                    </option>
                    <option value="i1">I1 (Included)</option>
                    <option value="si2">SI2 (Slightly Included)</option>
                    <option value="si1">SI1 (Slightly Included)</option>
                    <option value="vs2">VS2 (Very Slightly Included)</option>
                    <option value="vs1">VS1 (Very Slightly Included)</option>
                    <option value="vvs2">
                      VVS2 (Very Very Slightly Included)
                    </option>
                    <option value="vvs1">
                      VVS1 (Very Very Slightly Included)
                    </option>
                    <option value="if">IF (Internally Flawless)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="depth">Depth Percentage</label>
                  <input
                    type="number"
                    className="form-control"
                    id="depth"
                    placeholder="e.g. 62.5"
                    step="0.1"
                    min="50"
                    max="70"
                    onChange={handleChange}
                    name="depth"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="table">Table Percentage</label>
                  <input
                    type="number"
                    className="form-control"
                    id="table"
                    placeholder="e.g. 57"
                    step="0.1"
                    min="50"
                    max="70"
                    onChange={handleChange}
                    name="table"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="x_dimension">X Dimension (mm)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="x_dimension"
                    placeholder="e.g. 5.12"
                    step="0.01"
                    min="0"
                    onChange={handleChange}
                    name="x"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="y_dimension">Y Dimension (mm)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="y_dimension"
                    placeholder="e.g. 5.08"
                    step="0.01"
                    min="0"
                    onChange={handleChange}
                    name="y"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="z_dimension">Z Dimension (mm)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="z_dimension"
                    placeholder="e.g. 3.15"
                    step="0.01"
                    min="0"
                    onChange={handleChange}
                    name="z"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Get Diamond Value Prediction
                </button>
              </form>

              <div id="results-section" className="results-section hidden">
                <h3 className="results-title">Prediction Results</h3>

                <div className="prediction-result">
                  <p>Estimated Diamond Value</p>
                  <div className="result-value">
                    {price ? ` $${price}` : DEFAULT_PRICE}
                  </div>
                </div>

                <div ref={historyRef} className="history-section">
                  <h3 className="history-title">Recent Predictions</h3>
                  <table className="history-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Carat</th>
                        <th>Cut</th>
                        <th>Color</th>
                        <th>Clarity</th>
                        <th>Depth</th>
                        <th>Table percentage</th>
                        <th>X</th>
                        <th>Y</th>
                        <th>Z</th>
                        <th>Predicted Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hisData && hisData.length > 0 ? (
                        hisData.map((entry, index) => (
                          <tr key={index}>
                            <td>{entry?.date}</td>
                            <td>{entry?.carat?.toUpperCase() || "N/A"}</td>
                            <td>{entry?.cut?.toUpperCase() || "N/A"}</td>
                            <td>{entry?.color?.toUpperCase() || "N/A"}</td>
                            <td>{entry?.clarity?.toUpperCase() || "N/A"}</td>
                            <td>{entry?.depth || "N/A"}</td>
                            <td>{entry?.table || "N/A"}</td>
                            <td>{entry?.x || "N/A"}</td>
                            <td>{entry?.y || "N/A"}</td>
                            <td>{entry?.z || "N/A"}</td>
                            <td>{entry?.price || "N/A"}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="11" style={{ textAlign: "center" }}>
                            No history data available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
