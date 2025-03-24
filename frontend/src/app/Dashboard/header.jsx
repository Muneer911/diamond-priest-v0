"use client";
import "./headerStyle.css";
export default function Header(second) {
  return (
    <header>
      <div className="container header-content">
        <div className="logo">
          Diamond<span>Predict</span>
        </div>
        <div className="nav-links">
          <a href="#" className="active">
            Dashboard
          </a>
          <a href="#">History</a>
        </div>
        <div className="auth-buttons">
          <button className="btn btn-outline" onClick={() => {}}>
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
