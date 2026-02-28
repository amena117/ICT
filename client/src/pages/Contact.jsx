import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaTelegramPlane, FaYoutube, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
    return (
        <div className="container section">
            <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '8px' }}>
                <h1>Contact Us</h1>
                <p style={{ marginBottom: '1.5rem' }}>Secure communication channel.</p>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
                        <input type="text" style={{ width: '100%', padding: '0.5rem' }} placeholder="Your Name" />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                        <input type="email" style={{ width: '100%', padding: '0.5rem' }} placeholder="official@domain.gov" />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Message</label>
                        <textarea rows="5" style={{ width: '100%', padding: '0.5rem' }} placeholder="Enter your inquiry..."></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Send Secure Message</button>
                </form>

                {/* Social Media Icons */}
                <div className="mt-8 flex flex-col items-center border-t pt-6 border-gray-200">
                    <p className="text-sm text-gray-500 mb-4 font-medium">ይከተሉን | Follow Us</p>
                    <div className="flex gap-6 flex-wrap justify-center">
                        <motion.a
                            href="https://facebook.com/ethiopiandefense"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15 }}
                            className="text-3xl text-ethiopian-green hover:text-ethiopian-gold hover:brightness-110 hover:drop-shadow-lg transition-all duration-300"
                        >
                            <FaFacebook />
                        </motion.a>
                        <motion.a
                            href="https://t.me/ethiopiandefense"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15 }}
                            className="text-3xl text-ethiopian-green hover:text-ethiopian-gold hover:brightness-110 hover:drop-shadow-lg transition-all duration-300"
                        >
                            <FaTelegramPlane />
                        </motion.a>
                        <motion.a
                            href="https://youtube.com/ethiopiandefense"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15 }}
                            className="text-3xl text-ethiopian-green hover:text-ethiopian-gold hover:brightness-110 hover:drop-shadow-lg transition-all duration-300"
                        >
                            <FaYoutube />
                        </motion.a>
                        <motion.a
                            href="https://instagram.com/ethiopiandefense"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15 }}
                            className="text-3xl text-ethiopian-green hover:text-ethiopian-gold hover:brightness-110 hover:drop-shadow-lg transition-all duration-300"
                        >
                            <FaInstagram />
                        </motion.a>
                        <motion.a
                            href="https://twitter.com/ethiopiandefense"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15 }}
                            className="text-3xl text-ethiopian-green hover:text-ethiopian-gold hover:brightness-110 hover:drop-shadow-lg transition-all duration-300"
                        >
                            <FaTwitter />
                        </motion.a>
                        <motion.a
                            href="https://linkedin.com/company/ethiopiandefense"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15 }}
                            className="text-3xl text-ethiopian-green hover:text-ethiopian-gold hover:brightness-110 hover:drop-shadow-lg transition-all duration-300"
                        >
                            <FaLinkedin />
                        </motion.a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
