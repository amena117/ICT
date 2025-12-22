import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="container footer-content">
                <div className="footer-col">
                    <h3>ICT Office</h3>
                    <p>Delivering secure, innovative web systems for the Ministry of Defense.</p>
                </div>
                <div className="footer-col">
                    <h3>Quick Links</h3>
                    <ul className="footer-links">
                        <li><a href="/projects">Projects</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="/news">News</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/admin/login" style={{ fontSize: '0.8rem', opacity: '0.5' }}>Admin Login</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h3>Contact</h3>
                    <p>Defense HQ, Building C</p>
                    <p>secure.comms@mod.gov.ct</p>
                    <p>+123 456 7890</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 ICT Office - Ministry of Defense. Secure. Compliant.</p>
            </div>
        </footer>
    );
};

export default Footer;
