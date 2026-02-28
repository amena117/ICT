import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import CamouflagePattern from './CamouflagePattern';
import TechPattern from './TechPattern';

// Array of partner logos (replace 'src' values with your actual images or URLs)
const partnersList = [
    { id: 1, name: 'Ethiopian Defense Forces', src: '' },
    { id: 2, name: 'Ministry of Innovation and Technology', src: '' },
    { id: 3, name: 'Ethio Telecom', src: '' },
    { id: 4, name: 'Information Network Security Agency (INSA)', src: '' },
    { id: 5, name: 'Addis Ababa University', src: '' },
    { id: 6, name: 'Huawei Ethiopia', src: '' },
    { id: 7, name: 'Artificial Intelligence Institute', src: '' },
    { id: 8, name: 'Space Science and Geospatial Institute', src: '' },
];

const Partners = () => {
    const { t, i18n } = useTranslation();

    // Duplicate the array to create a seamless infinite marquee effect
    const doubledPartners = [...partnersList, ...partnersList];

    return (
        <section className="section bg-gradient-to-br from-ranger-khaki/20 via-white/30 to-ranger-tan-light/15 relative overflow-hidden py-16">
            {/* Subtle Background Patterns */}
            <CamouflagePattern variant="subtle" opacity={0.05} />
            <TechPattern variant="circuit" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full max-w-7xl">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                        {t('partners.title') || (i18n.language === 'en' ? 'Our Partners' : 'አጋሮቻችን')}
                    </h2>
                </motion.div>

                {/* Marquee Container */}
                <div className="relative w-full overflow-hidden flex items-center h-32 md:h-44 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/60 shadow-inner">
                    {/* Floating Left-to-Right Wrapper */}
                    <motion.div
                        className="flex whitespace-nowrap pl-4 pr-4"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 35, // Adjust duration (30-40s) for scroll speed
                        }}
                        // Pauses the marquee on hover
                        whileHover={{ animationPlayState: "paused" }}
                    >
                        {doubledPartners.map((partner, index) => (
                            <div
                                key={`${partner.id}-${index}`}
                                className="inline-flex flex-col items-center justify-center mx-8 md:mx-12 lg:mx-16 group cursor-pointer"
                            >
                                {/* Logo container with hover scale and colorize effect */}
                                <div className="h-16 md:h-20 lg:h-24 w-32 md:w-40 lg:w-48 bg-white/60 rounded-xl shadow-sm border border-gray-200/50 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:border-ethiopian-green/30 group-hover:bg-white relative">
                                    {partner.src ? (
                                        <img
                                            src={partner.src}
                                            alt={partner.name}
                                            className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 p-2 md:p-3"
                                        />
                                    ) : (
                                        <span className="text-xs md:text-sm text-center font-semibold text-gray-500 group-hover:text-ethiopian-green px-2 italic whitespace-normal transition-colors duration-300">
                                            {partner.name}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Gradient Fade Edges for blending */}
                    <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
                    <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
                </div>
            </div>
        </section>
    );
};

export default Partners;
