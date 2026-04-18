import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import TechPattern from '../components/TechPattern';
import CamouflagePattern from '../components/CamouflagePattern';

const Services = () => {
    const { t } = useTranslation();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch('/api/services')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setServices(data);
                } else if (data.data && Array.isArray(data.data)) {
                    setServices(data.data);
                } else {
                    setServices([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load services:", err);
                setLoading(false);
            });
    }, []);

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
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const iconMap = {
        'fa-shield-alt': '🛡️',
        'fa-network-wired': '🌐',
        'fa-cloud': '☁️',
        'fa-lock': '🔒',
        'fa-server': '🖥️',
        'fa-code': '💻',
        'fa-database': '🗄️',
        'fa-mobile-alt': '📱',
    };

    const serviceIcons = {
        '🛡️': '🛡️',
        '🌐': '🌐',
        '☁️': '☁️',
        '🔒': '🔒',
        '🖥️': '🖥️',
        '💻': '💻',
        '🗄️': '🗄️',
        '📱': '📱',
    };

    return (
        <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-ranger-olive-dark via-ranger-olive to-primary-dark relative overflow-hidden">
            <CamouflagePattern variant="organic" opacity={0.15} />
            <TechPattern variant="circuit" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="section-label text-white">{t('services.label')}</p>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        {t('services.title')}
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        {t('services.subtitle')}
                    </p>
                </motion.div>

                {loading ? (
                    <div className="text-center py-20">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-16 h-16 border-4 border-ethiopian-green border-t-transparent rounded-full mx-auto"
                        />
                        <p className="mt-4 text-gray-300">{t('services.loading')}</p>
                    </div>
                ) : (
                    <>
                        {services.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20 bg-gradient-to-br from-gray-800 to-primary-dark rounded-2xl shadow-lg border border-ethiopian-green/30"
                            >
                                <p className="text-gray-300 text-lg">
                                    {t('services.noServices')}
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {services.map((service, idx) => {
                                    const icon = service.icon
                                        ? iconMap[service.icon] || '⚙️'
                                        : '⚙️';
                                    
                                    return (
                                        <motion.div
                                            key={service._id || idx}
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.05, y: -8 }}
                                            className="bg-gradient-to-br from-gray-800 to-primary-dark rounded-xl p-6 border border-ethiopian-green/30 shadow-xl group cursor-pointer relative overflow-hidden"
                                        >
                                            {/* Animated background pattern */}
                                            <div className="absolute inset-0 opacity-10">
                                                <div className="absolute inset-0" style={{
                                                    backgroundImage: `linear-gradient(45deg, #006A4E 25%, transparent 25%), linear-gradient(-45deg, #006A4E 25%, transparent 25%)`,
                                                    backgroundSize: '20px 20px',
                                                }} />
                                            </div>

                                            {/* Top border accent */}
                                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-ethiopian-green to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            
                                            <div className="relative z-10">
                                                {/* Icon */}
                                                <motion.div
                                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                                    className="text-5xl mb-6 inline-block"
                                                >
                                                    {icon}
                                                </motion.div>

                                                {/* Title */}
                                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-ethiopian-green transition-colors duration-300">
                                                    {service.title}
                                                </h3>
                                                
                                                {/* Amharic Title */}
                                                {service.title_am && (
                                                    <h4 className="text-lg text-ethiopian-green mb-4 font-semibold">
                                                        {service.title_am}
                                                    </h4>
                                                )}

                                                {/* Description */}
                                                <p className="text-gray-300 leading-relaxed mb-4 text-lg">
                                                    {service.description}
                                                </p>
                                                
                                                {/* Amharic Description */}
                                                {service.description_am && (
                                                    <p className="text-gray-400 text-base leading-relaxed italic border-t border-gray-700 pt-4">
                                                        {service.description_am}
                                                    </p>
                                                )}

                                                {/* Hover indicator */}
                                                <div className="mt-6 flex items-center gap-2 text-ethiopian-green opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <span className="text-sm font-semibold">{t('services.viewDetails')}</span>
                                                    <motion.span
                                                        animate={{ x: [0, 4, 0] }}
                                                        transition={{ duration: 1.5, repeat: Infinity }}
                                                    >
                                                        →
                                                    </motion.span>
                                                </div>
                                            </div>

                                            {/* Status indicator */}
                                            <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-ethiopian-green animate-pulse" />
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Services;
