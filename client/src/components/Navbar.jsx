import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <header>
            <div className="container navbar">
                <Link to="/" className="logo">
                    <span>🛡️</span> ICT Office
                </Link>

                <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation">
                    <span className="hamburger"></span>
                </button>

                <nav className={`nav-links ${isOpen ? 'open' : ''}`}>
                    <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>Home</NavLink>
                    <NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>Projects</NavLink>
                    <NavLink to="/services" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>Services</NavLink>
                    <NavLink to="/news" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>News</NavLink>
                    <NavLink to="/resources" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>Resources</NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>About</NavLink>
                    <Link to="/contact" className="btn btn-primary" onClick={() => setIsOpen(false)}>Contact Us</Link>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
