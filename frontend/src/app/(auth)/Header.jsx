import "./signin/style.css";
export default function Header() {
  return (
    <header>
      <div className="container header-content">
        <div className="logo">
          Diamond <span>Priest</span>
        </div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </header>
  );
}
