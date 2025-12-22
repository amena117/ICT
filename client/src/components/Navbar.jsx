import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'am' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <header>
            <div className="container navbar">
                <Link to="/" className="logo">
                    <span>🛡️</span> ICT Office
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        onClick={toggleLanguage}
                        className="btn"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', border: '1px solid #ccc', marginRight: '10px' }}
                    >
                        {i18n.language === 'en' ? 'አማርኛ' : 'English'}
                    </button>

                    <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation">
                        <span className="hamburger"></span>
                    </button>
                </div>

                <nav className={`nav-links ${isOpen ? 'open' : ''}`}>
                    <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>{t('nav.home')}</NavLink>
                    <NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>{t('nav.projects')}</NavLink>
                    <NavLink to="/services" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>{t('nav.services')}</NavLink>
                    <NavLink to="/news" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>{t('nav.news')}</NavLink>
                    <NavLink to="/resources" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>{t('nav.resources')}</NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>{t('nav.about')}</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>{t('nav.contact')}</NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
