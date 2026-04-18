import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaBullseye, FaRocket, FaGlobe, FaServer, FaCogs, FaShieldAlt, FaLaptopCode } from 'react-icons/fa';
import CamouflagePattern from '../components/CamouflagePattern';

const About = () => {
    const { t } = useTranslation();

    const officials = [
        {
            name: "Gen. Arthur Sterling",
            role: t('aboutPage.roles.cio'),
            bio: t('aboutPage.bios.cio'),
            imageUrl: "https://placehold.co/150x150/001F3F/ffffff?text=CIO"
        },
        {
            name: "Sarah Jenkins",
            role: t('aboutPage.roles.deputyCyber'),
            bio: t('aboutPage.bios.deputyCyber'),
            imageUrl: "https://placehold.co/150x150/006A4E/ffffff?text=Sec+Dir"
        },
        {
            name: "Col. James Vance",
            role: t('aboutPage.roles.headInfra'),
            bio: t('aboutPage.bios.headInfra'),
            imageUrl: "https://placehold.co/150x150/556B2F/ffffff?text=Infra+Head"
        }
    ];

    const activities = [
        {
            id: "3.1",
            icon: <FaLaptopCode />,
            text: t('aboutPage.activities.item1')
        },
        {
            id: "3.2",
            icon: <FaServer />,
            text: t('aboutPage.activities.item2')
        },
        {
            id: "3.3",
            icon: <FaCogs />,
            text: t('aboutPage.activities.item3')
        },
        {
            id: "3.4",
            icon: <FaShieldAlt />,
            text: t('aboutPage.activities.item4')
        },
        {
            id: "3.5",
            icon: <FaGlobe />,
            text: t('aboutPage.activities.item5')
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-ranger-khaki/30 via-white to-ranger-tan-light/25 relative overflow-hidden">
            <CamouflagePattern variant="subtle" opacity={0.08} />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <p className="section-label">{t('aboutPage.label')}</p>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        {t('aboutPage.title')}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        {t('aboutPage.description')}
                    </p>
                </motion.div>

                {/* Goal and Mission Section */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24"
                >
                    {/* Goal Card */}
                    <motion.div variants={itemVariants} className="card group bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl p-8 md:p-10 flex flex-col h-full relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-ethiopian-green/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                        <div className="w-14 h-14 bg-ethiopian-green/10 text-ethiopian-green rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                            <FaBullseye />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('goal.title')}</h2>
                        <div className="flex-grow space-y-4">
                            <p className="text-gray-800 font-medium text-lg leading-relaxed">
                                {t('goal.text')}
                            </p>
                        </div>
                    </motion.div>

                    {/* Mission Card */}
                    <motion.div variants={itemVariants} className="card group bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl p-8 md:p-10 flex flex-col h-full relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-br-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                        <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                            <FaRocket />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('mission.title')}</h2>
                        <div className="flex-grow space-y-4">
                            <p className="text-gray-800 font-medium text-lg leading-relaxed">
                                {t('mission.text')}
                            </p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Main Activities Section */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-24"
                >
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 inline-block gradient-underline pb-4">
                            {t('aboutPage.activitiesTitle')}
                        </h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {activities.map((activity) => (
                            <motion.div 
                                key={activity.id} 
                                variants={itemVariants}
                                whileHover={{ y: -8 }}
                                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 relative group flex flex-col h-full overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 border-t-[50px] border-r-[50px] border-t-ranger-olive/10 border-r-transparent rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-xl shadow-md">
                                        {activity.icon}
                                    </div>
                                    <span className="text-2xl font-bold text-gray-300 group-hover:text-primary transition-colors">{activity.id}</span>
                                </div>
                                <p className="text-gray-800 font-medium leading-relaxed flex-grow">
                                    {activity.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Leadership Section */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 inline-block gradient-underline pb-4">
                            {t('aboutPage.leadershipTitle')}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {officials.map((person, idx) => (
                            <motion.div 
                                key={idx} 
                                variants={itemVariants}
                                className="group flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-50"
                            >
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-md transform scale-90 group-hover:scale-105 transition-transform duration-300"></div>
                                    <img
                                        src={person.imageUrl}
                                        alt={person.name}
                                        className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg relative z-10"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                                    {person.name}
                                </h3>
                                <h4 className="text-sm font-semibold text-ethiopian-green uppercase tracking-wider mb-4">
                                    {person.role}
                                </h4>
                                <p className="text-gray-600 leading-relaxed max-w-sm">
                                    {person.bio}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default About;
