"use client";
// import "./headerStyle.css";
import Cookie from "js-cookie";

export default function DashBoardHeader(second) {
  const handleLogOut = () => {
    Cookie.remove("access_token");
    // location.reload();
    window.location.href = "/signin";
  };
  return (
    <header>
      <div className="container header-content">
        <div className="logo">
          Diamond<span>Predict</span>
        </div>
        <div className="auth-buttons">
          <button className="btn btn-outline" onClick={handleLogOut}>
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
