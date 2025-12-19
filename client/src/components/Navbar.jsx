import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <div className="container navbar">
                <Link to="/" className="logo">
                    <span>🛡️</span> ICT Office
                </Link>
                <nav className="nav-links">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
                    <NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : ''}>Projects</NavLink>
                    <NavLink to="/services" className={({ isActive }) => isActive ? 'active' : ''}>Services</NavLink>
                    <NavLink to="/news" className={({ isActive }) => isActive ? 'active' : ''}>News</NavLink>
                    {/* <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink> */}
                    <Link to="/contact" className="btn btn-primary">Contact Us</Link>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
