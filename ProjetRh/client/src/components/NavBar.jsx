import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="navBar">
            <ul>
                <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Home</li>
                </NavLink>
                <NavLink to="/user" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Get All User</li>
                </NavLink>
            </ul>
        </div>
    );
};

export default NavBar;
