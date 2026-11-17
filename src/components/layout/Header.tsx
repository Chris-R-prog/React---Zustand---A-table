import { Link, NavLink } from "react-router";

export default function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="brand">
        <span className="brand-name">À table !</span>
        <span className="brand-tagline">RECETTES & INSPIRATIONS</span>
      </Link>

      <nav className="main-nav" aria-label="Navigation principale">
        <NavLink to="/">Recettes</NavLink>
        <NavLink to="/courses">Mes courses</NavLink>
        <NavLink to="/planning">Planning</NavLink>
      </nav>
    </header>
  );
}
