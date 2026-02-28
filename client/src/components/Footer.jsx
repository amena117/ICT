import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebook, FaTelegramPlane, FaYoutube, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import logo from '../assets/Emblem_of_the_Ethiopian_National_Defense_Force_(2).svg.png';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        { to: '/projects', label: 'Projects' },
        { to: '/services', label: 'Services' },
        { to: '/news', label: 'News' },
        { to: '/contact', label: 'Contact' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <footer className="bg-gradient-to-br from-ranger-olive-dark via-ranger-olive to-primary-dark text-white relative overflow-hidden">
            {/* Background Pattern with ranger colors */}
            <div className="absolute inset-0 opacity-8">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        radial-gradient(circle at 20% 30%, rgba(195, 176, 145, 0.2) 0%, transparent 40%),
                        radial-gradient(circle at 60% 70%, rgba(85, 107, 47, 0.15) 0%, transparent 40%),
                        radial-gradient(circle at 80% 20%, rgba(139, 115, 85, 0.15) 0%, transparent 40%)
                    `,
                }} />
            </div>

            {/* Decorative gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ethiopian-green via-ethiopian-gold to-ethiopian-red" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16"
                >
                    {/* Brand Column */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 flex items-center justify-center">
                                <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                            </div>
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-ethiopian-green/80 bg-clip-text text-transparent">
                                ICT
                            </h3>
                        </div>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            Delivering secure, innovative ICT solutions for national defense
                        </p>
                        <div className="flex gap-4 mt-6">
                            {['🌐', '📧', '📱'].map((icon, idx) => (
                                <motion.a
                                    key={idx}
                                    href="#"
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-xl hover:bg-white/20 transition-colors cursor-pointer"
                                >
                                    {icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links Column */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h3 className="text-xl font-bold mb-6 relative inline-block">
                            Quick Links
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-ethiopian-green to-transparent" />
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-gray-300 hover:text-white transition-colors duration-300 inline-flex items-center gap-2 group"
                                    >
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-ethiopian-green transition-all duration-300" />
                                        <span>{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    to="/admin/login"
                                    className="text-gray-400 hover:text-gray-300 transition-colors text-sm inline-flex items-center gap-2 group"
                                >
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-gray-400 transition-all duration-300" />
                                    <span>Admin Login</span>
                                </Link>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Contact Column */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h3 className="text-xl font-bold mb-6 relative inline-block">
                            Contact
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-ethiopian-green to-transparent" />
                        </h3>
                        <div className="space-y-4 text-gray-300">
                            <div className="flex items-start gap-3">
                                <span className="text-ethiopian-green mt-1">📍</span>
                                <p className="leading-relaxed">
                                    Defense HQ, Building C<br />
                                    Addis Ababa, Ethiopia
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-ethiopian-green">📧</span>
                                <a
                                    href="mailto:secure.comms@mod.gov.et"
                                    className="hover:text-white transition-colors"
                                >
                                    secure.comms@mod.gov.et
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-ethiopian-green">📞</span>
                                <a
                                    href="tel:+251110000000"
                                    className="hover:text-white transition-colors"
                                >
                                    +251 11 000 0000
                                </a>
                            </div>
                        </div>

                        {/* Social Media Icons */}
                        <div className="mt-8 flex flex-col items-start">
                            <p className="text-sm text-gray-400 mb-3 font-medium">ይከተሉን | Follow Us</p>
                            <div className="flex gap-5 flex-wrap">
                                <motion.a
                                    href="https://facebook.com/ethiopiandefense"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.15 }}
                                    className="text-2xl text-ethiopian-green hover:text-white hover:brightness-110 hover:drop-shadow-lg transition-all duration-300"
                                >
                                    <FaFacebook />
                                </motion.a>
                                <motion.a
                                    href="https://t.me/ethiopiandefense"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.15 }}
                                    className="text-2xl text-ethiopian-green hover:text-white hover:brightness-110 hover:drop-shadow-lg transition-all duration-300"
                                >
                                    <FaTelegramPlane />
                                </motion.a>
                                <motion.a
                                    href="https://youtube.com/ethiopiandefense"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.15 }}
                                    className="text-2xl text-ethiopian-green hover:text-white hover:brightness-110 hover:drop-shadow-lg transition-all duration-300"
                                >
                                    <FaYoutube />
                                </motion.a>
                                <motion.a
                                    href="https://instagram.com/ethiopiandefense"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.15 }}
                                    className="text-2xl text-ethiopian-green hover:text-white hover:brightness-110 hover:drop-shadow-lg transition-all duration-300"
                                >
                                    <FaInstagram />
                                </motion.a>
                                <motion.a
                                    href="https://twitter.com/ethiopiandefense"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.15 }}
                                    className="text-2xl text-ethiopian-green hover:text-white hover:brightness-110 hover:drop-shadow-lg transition-all duration-300"
                                >
                                    <FaTwitter />
                                </motion.a>
                                <motion.a
                                    href="https://linkedin.com/company/ethiopiandefense"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.15 }}
                                    className="text-2xl text-ethiopian-green hover:text-white hover:brightness-110 hover:drop-shadow-lg transition-all duration-300"
                                >
                                    <FaLinkedin />
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="border-t border-white/10 pt-8 pb-6"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            &copy; {currentYear} ICT  - Ministry of Defense. Secure. Compliant.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>Made with</span>
                            <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="text-ethiopian-red"
                            >
                                ICT
                            </motion.span>
                            <span>for Ethiopia</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
