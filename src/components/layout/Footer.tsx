const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <span className="brand-name">À table !</span>
          <p>Le plaisir de cuisiner, chaque jour.</p>
        </div>

        <p className="footer-copyright">
          &copy; {currentYear} À table !
        </p>
      </div>
    </footer>
  );
}
