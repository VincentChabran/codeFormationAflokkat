import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navBar">
            <div className="navBarLogo">
                <h3>Aflokkat Front Logo</h3>
            </div>
            <ul className="navBarLink">
                <NavLink to="/" className={(nav) => (nav.isActive ? "navActive" : "")}>
                    <h4>Home</h4>
                </NavLink>
                <NavLink to="/formation" className={(nav) => (nav.isActive ? "navActive" : "")}>
                    <h4>Formation</h4>
                </NavLink>
            </ul>
        </nav>
    );
};

export default NavBar;
