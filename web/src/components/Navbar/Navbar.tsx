/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
// import styled from "styled-components";

// const Styles = styled.div`
//   max-width: 100% !important;
// `;

export const Navbar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            Proyecto
            <i className="fab fa-typo3" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/home" className="nav-links" onClick={closeMobileMenu}>
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/machine/new"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Nueva Máquina
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/list" className="nav-links" onClick={closeMobileMenu}>
                Ver Máquinas
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/fault/new"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Reportar Falla
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
