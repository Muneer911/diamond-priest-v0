"use client";
import "./style.css";
export default function dashboard() {
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

              <form className="diamond-form">
                <div className="form-group">
                  <label htmlFor="carat">Carat Weight</label>
                  <input
                    type="number"
                    className="form-control"
                    id="carat"
                    placeholder="e.g. 1.5"
                    step="0.01"
                    min="0.1"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cut">Cut Quality</label>
                  <select className="form-control" id="cut" defaultValue="">
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
                  <select className="form-control" id="color" defaultValue="">
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
                  <select className="form-control" id="clarity" defaultValue="">
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
                  />
                </div>

                <div className="form-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {}}
                  >
                    Predict Value
                  </button>
                </div>
              </form>

              <div id="results-section" className="results-section hidden">
                <h3 className="results-title">Prediction Results</h3>

                <div className="prediction-result">
                  <p>Estimated Diamond Value</p>
                  <div className="result-value">$8,432.50</div>
                  <p className="result-confidence">
                    Prediction confidence: 92%
                  </p>
                </div>

                <div className="detail-cards">
                  <div className="detail-card">
                    <h4>Price Range</h4>
                    <p>$7,950 - $8,900</p>
                  </div>
                  <div className="detail-card">
                    <h4>Market Trend</h4>
                    <p>Upward (+3.2%)</p>
                  </div>
                  <div className="detail-card">
                    <h4>Similar Diamonds</h4>
                    <p>42 matches</p>
                  </div>
                  <div className="detail-card">
                    <h4>Quality Score</h4>
                    <p>8.7/10</p>
                  </div>
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
                        <th>Predicted Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Mar 21, 2025</td>
                        <td>1.2</td>
                        <td>Ideal</td>
                        <td>F</td>
                        <td>VS1</td>
                        <td>$7,245.00</td>
                      </tr>
                      <tr>
                        <td>Mar 18, 2025</td>
                        <td>0.8</td>
                        <td>Premium</td>
                        <td>E</td>
                        <td>VVS2</td>
                        <td>$4,120.75</td>
                      </tr>
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
