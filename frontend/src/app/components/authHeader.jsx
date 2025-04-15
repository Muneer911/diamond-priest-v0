import "../style.css";
export default function AuthHeader() {
  return (
    <header>
      <div className="container header-content">
        <div className="logo">
          Diamond <span> Priest </span>
        </div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">About</a>
        </div>
      </div>
    </header>
  );
}
