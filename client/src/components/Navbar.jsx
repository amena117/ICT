import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/Emblem_of_the_Ethiopian_National_Defense_Force_(2).svg.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'am' : 'en';
        i18n.changeLanguage(newLang);
    };

    const navLinks = [
        { to: '/', label: t('nav.home') },
        { to: '/projects', label: t('nav.projects') },
        { to: '/services', label: t('nav.services') },
        { to: '/news', label: t('nav.news') },
        { to: '/resources', label: t('nav.resources') },
        { to: '/about', label: t('nav.about') },
        { to: '/contact', label: t('nav.contact') },
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'glass-effect shadow-lg border-b border-ranger-tan/30 bg-gradient-to-r from-white/95 via-ranger-khaki/10 to-white/95 backdrop-blur-md'
                    : 'bg-gradient-to-r from-white/95 via-ranger-khaki/5 to-white/95 dark:bg-gray-900/95 backdrop-blur-md'
                }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link
                        to="/"
                        className="flex items-center gap-3 group"
                    >
                        <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-ethiopian-green bg-clip-text text-transparent tracking-tight">
                            ICT
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    `relative px-2 py-1 font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300 hover:text-primary ${isActive ? 'text-primary' : ''
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {link.label}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeNav"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-ethiopian-green to-primary rounded-full"
                                                initial={false}
                                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}

                        {/* Language Switcher */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleLanguage}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-ethiopian-green/10 border border-primary/20 hover:border-primary/40 transition-all duration-300 font-semibold text-primary"
                            aria-label="Toggle language"
                        >
                            <span className="text-lg">
                                {i18n.language === 'en' ? '🇪🇹' : '🇬🇧'}
                            </span>
                            <span className="text-sm">
                                {i18n.language === 'en' ? t('common.amharic') : t('common.english')}
                            </span>
                        </motion.button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle navigation"
                    >
                        <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
                            <motion.span
                                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                                className="w-full h-0.5 bg-primary rounded-full"
                            />
                            <motion.span
                                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="w-full h-0.5 bg-primary rounded-full"
                            />
                            <motion.span
                                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                                className="w-full h-0.5 bg-primary rounded-full"
                            />
                        </div>
                    </button>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.nav
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="py-4 space-y-2 border-t border-gray-200 dark:border-gray-700 mt-2">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.to}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <NavLink
                                            to={link.to}
                                            onClick={() => setIsOpen(false)}
                                            className={({ isActive }) =>
                                                `block px-4 py-3 rounded-lg font-semibold transition-colors ${isActive
                                                    ? 'bg-gradient-to-r from-primary/10 to-ethiopian-green/10 text-primary border-l-4 border-ethiopian-green'
                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                                }`
                                            }
                                        >
                                            {link.label}
                                        </NavLink>
                                    </motion.div>
                                ))}

                                {/* Mobile Language Switcher */}
                                <motion.button
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: navLinks.length * 0.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        toggleLanguage();
                                        setIsOpen(false);
                                    }}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold bg-gradient-to-r from-primary/10 to-ethiopian-green/10 border border-primary/20 text-primary mt-4"
                                >
                                    <span className="text-lg">
                                        {i18n.language === 'en' ? '🇪🇹' : '🇬🇧'}
                                    </span>
                                    <span>
                                        {i18n.language === 'en' ? t('common.amharic') : t('common.english')}
                                    </span>
                                </motion.button>
                            </div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    );
};

export default Navbar;
