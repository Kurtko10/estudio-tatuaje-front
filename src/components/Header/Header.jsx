import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../app/slices/userSlice";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-scroll';
import logo from '../../img/11236081_11255.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Header.css";

function Header() {
  
  const [activeLink, setActiveLink] = useState("");
  const [scrollTimeout, setScrollTimeout] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Acceder al estado de Redux para verificar si el usuario está autenticado
  const isLoggedIn = useSelector(state => state.user.token !== "");
  const dispatch = useDispatch();


  const handleLogout = () => {
    
    console.log("Bye, Bye");
    dispatch(logout());
    navigate("/");
  };

  const handleNavLinkClick = (section) => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      setActiveLink(section);
    }
  };

  const handleScroll = () => {
    if (location.pathname === "/") {
      clearTimeout(scrollTimeout);
      setScrollTimeout(
        setTimeout(() => {
          const currentSection = location.hash.substring(1);
          setActiveLink(currentSection);
        }, 2000)
      );
    }
  };
  
  useEffect(() => {
    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [location.pathname, scrollTimeout]);

  useEffect(() => {
    const myPassport = JSON.parse(sessionStorage.getItem("passport"));
    if (myPassport) {
      setIsLoggedIn(true);
    }
  }, [location.pathname]);

  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar-with-background navbar-with-border">
      <Container className="container-fluid">
      <Navbar.Brand href="/">
  <img 
    src={logo} 
    width="120"
    height="30"
    className="d-inline-block align-top logo"
    alt="Mi app de R&M"
  />
</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="home" spy={true} smooth={false} duration={1500} onClick={() => handleNavLinkClick("home")} className={`nav-link ${activeLink === "home" ? "active" : ""}`}>Home</Nav.Link>
            <Nav.Link as={Link} to="studio" spy={true} smooth={false} duration={1500} onClick={() => handleNavLinkClick("studio")} className={`nav-link ${activeLink === "studio" ? "active" : ""}`}>El Estudio</Nav.Link>
            <Nav.Link as={Link} to="services" spy={true} smooth={false} duration={1500} onClick={() => handleNavLinkClick("services")} className={`nav-link ${activeLink === "services" ? "active" : ""}`}>Servicios</Nav.Link>
            <Nav.Link as={Link} to="artists" spy={true} smooth={false} duration={1500} onClick={() => handleNavLinkClick("artists")} className={`nav-link ${activeLink === "artists" ? "active" : ""}`}>Artistas</Nav.Link>
            <Nav.Link as={Link} to="contact" spy={true} smooth={false} duration={1500} onClick={() => handleNavLinkClick("contact")} className={`nav-link ${activeLink === "contact" ? "active" : ""}`}>Contacto</Nav.Link>
            <Nav.Link as={Link} to="reviews" spy={true} smooth={false} duration={1500} onClick={() => handleNavLinkClick("reviews")} className={`nav-link ${activeLink === "reviews" ? "active" : ""}`}>Reseñas</Nav.Link>
            <NavDropdown title="Despliégame!" id="basic-nav-dropdown">
              {isLoggedIn ? (
                <>
                  <NavDropdown.Item as={Link} to="profile" spy={true} smooth={true} duration={500} onClick={() => navigate("/profile")} className={`nav-link ${activeLink === "profile" ? "active" : ""}`}>Ver Perfil
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item href="/login" className={location.pathname === "/login" ? "active" : ""}>
                    Login
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/register" className={location.pathname === "/register" ? "active" : ""}>
                    Register
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
          <div className="arrow"></div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;