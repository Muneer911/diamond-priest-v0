"use client";

import { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";

export default function dashboard() {
  const [formData, setFormData] = useState();
  const [price, setPrice] = useState();
  const [hisData, setHisData] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle prediction request
  const handlePrediction = async (e) => {
    e.preventDefault();
    try {
      // Send formData to the backend for prediction
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData
      );
      console.log(response);

      setPrice(response["data"]);
    } catch {
      alert("Error");
    }
  };

  useEffect(() => {
    const fetchis = async () => {
      // Ensure price is valid before proceeding
      try {
        const response = await axios.get("http://127.0.0.1:5000/gethis");
        console.log("Fetched Prediction History:", response.data);
        setHisData(response.data);
      } catch (error) {
        console.error("Error fetching prediction history:", error);
        alert("Failed to fetch prediction history. Please try again.");
      }
    };
    fetchis();
  }, []);

  return (
    <div id="dashboard-page" className="hidden">
      <main>
        <div className="container">
          <div className="dashboard">
            <div className="sidebar">
              <div className="sidebar-header">
                <div className="user-avatar">JD</div>
                <div>
                  <h3>John Doe</h3>
                  <p>john.doe@example.com</p>
                </div>
              </div>

              <ul className="sidebar-menu">
                <li>
                  <a href="#" className="active">
                    Diamond Prediction
                  </a>
                </li>
                <li>
                  <a href="#">Prediction History</a>
                </li>
                <li>
                  <a href="#">Model Performance</a>
                </li>
              </ul>
            </div>

            <div className="main-content">
              <div className="dashboard-header">
                <h2 className="dashboard-title">Diamond Value Prediction</h2>
                <button className="btn btn-outline">View History</button>
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

                <div className="form-footer">
                  <button type="submit" className="btn btn-primary">
                    Predict Value
                  </button>
                </div>
              </form>

              <div id="results-section" className="results-section hidden">
                <h3 className="results-title">Prediction Results</h3>

                <div className="prediction-result">
                  <p>Estimated Diamond Value</p>
                  <div className="result-value">
                    {price ? ` $${price}` : "$8,432.50"}
                  </div>

                  <p className="result-confidence">
                    Prediction confidence: 92%{" "}
                  </p>
                </div>

                <div className="history-section">
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
                        <th>Table precentage</th>
                        <th>X</th>
                        <th>Y</th>
                        <th>Z</th>
                        <th>Predicted Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hisData && hisData.length > 0
                        ? hisData.map((entry, index) => (
                            <tr key={index}>
                              <td>{entry?.date}</td>
                              <td>
                                {entry?.data?.carat.toUpperCase() || "N/A"}
                              </td>
                              <td>{entry?.data?.cut.toUpperCase() || "N/A"}</td>
                              <td>
                                {entry?.data?.color.toUpperCase() || "N/A"}
                              </td>
                              <td>
                                {entry?.data?.clarity.toUpperCase() || "N/A"}
                              </td>
                              <td>{entry?.data?.depth || "N/A"}</td>
                              <td>{entry?.data?.table || "N/A"}</td>
                              <td>{entry?.data?.x || "N/A"}</td>
                              <td>{entry?.data?.y || "N/A"}</td>
                              <td>{entry?.data?.z || "N/A"}</td>
                              <td>{entry?.price || "N/A"}</td>
                            </tr>
                          ))
                        : ""}
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
