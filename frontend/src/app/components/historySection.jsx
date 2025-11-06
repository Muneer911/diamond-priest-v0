const HistorySection = ({ historyRef, hisData }) => {
  const date = new Date(hisData);

  return (
    <div ref={historyRef} className="history-section">
      <h3 className="history-title">Recent Predictions</h3>
      <table className="history-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Carat</th>
            <th>Cut</th>
            <th className="sm-screen-off">Color</th>
            <th className="sm-screen-off">Clarity</th>
            <th className="sm-screen-off">Depth</th>
            <th className="sm-screen-off">Table percentage</th>
            <th className="sm-screen-off">X</th>
            <th className="sm-screen-off">Y</th>
            <th className="sm-screen-off">Z</th>
            <th>Predicted Value</th>
          </tr>
        </thead>
        <tbody>
          {hisData && hisData.length > 0 ? (
            hisData.map((entry, index) => {
              const date = new Date(entry?.created_at);
              const price = Math.round(entry?.price);

              return (
                <tr key={index}>
                  <td>{date.toDateString()}</td>
                  <td>{entry?.carat?.toUpperCase() || "N/A"}</td>
                  <td>{entry?.cut?.toUpperCase() || "N/A"}</td>
                  <td className="sm-screen-off">
                    {entry?.color?.toUpperCase() || "N/A"}
                  </td>
                  <td className="sm-screen-off">
                    {entry?.clarity?.toUpperCase() || "N/A"}
                  </td>
                  <td className="sm-screen-off">{entry?.depth || "N/A"}</td>
                  <td className="sm-screen-off">{entry?.table || "N/A"}</td>
                  <td className="sm-screen-off">{entry?.x || "N/A"}</td>
                  <td className="sm-screen-off">{entry?.y || "N/A"}</td>
                  <td className="sm-screen-off">{entry?.z || "N/A"}</td>
                  <td>{price.toString() + "$" || "N/A"}</td>
                </tr>
              );
            })
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
  );
};
export default HistorySection;
