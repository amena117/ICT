import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import NetworkVisualization from '../components/NetworkVisualization';
import DataMetrics from '../components/DataMetrics';
import TechPattern from '../components/TechPattern';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t, i18n } = useTranslation();
    const [featuredProjects, setFeaturedProjects] = useState([]);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 300], [0, 150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                if (data.data && Array.isArray(data.data)) {
                    setFeaturedProjects(data.data.slice(0, 3));
                } else if (Array.isArray(data)) {
                    setFeaturedProjects(data.slice(0, 3));
                } else {
                    console.error('API returned non-array:', data);
                    setFeaturedProjects([]);
                }
            })
            .catch(err => console.error('Error fetching projects:', err));
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <div className="pt-20">
            {/* Hero Section with Military ICT Theme */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-ranger-olive-dark via-ranger-olive to-primary-dark">
                {/* Camouflage Pattern Background */}
                <CamouflagePattern variant="organic" opacity={0.15} />
                {/* Tech Pattern Background */}
                <TechPattern variant="circuit" />
                
                {/* Network Visualization Overlay */}
                <div className="absolute inset-0 opacity-20">
                    <NetworkVisualization />
                </div>

                {/* Background Image with Parallax */}
                <motion.div
                    style={{ y: y1, opacity }}
                    className="absolute inset-0 z-0"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: "url('/hero.png')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    {/* Military Tech Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-ethiopian-green/30" />
                    {/* Data Stream Effect */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `repeating-linear-gradient(
                                0deg,
                                transparent,
                                transparent 2px,
                                rgba(0, 106, 78, 0.3) 2px,
                                rgba(0, 106, 78, 0.3) 4px
                            )`,
                        }} />
                    </div>
                </motion.div>

                {/* Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center"
                >
                    {/* Military Badge/Logo */}
                    <motion.div
                        variants={itemVariants}
                        className="mb-6 flex justify-center"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-ethiopian-green/20 blur-xl rounded-full" />
                            <div className="relative bg-gradient-to-br from-ethiopian-green/30 to-primary/30 backdrop-blur-sm rounded-full p-6 border-2 border-ethiopian-green/50">
                                <span className="text-6xl">🛡️</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight"
                    >
                        <span className="block mb-2 bg-gradient-to-r from-white via-ethiopian-green to-white bg-clip-text text-transparent">
                            {t('hero.title')}
                        </span>
                        <span className="text-2xl md:text-3xl font-light text-gray-300 block mt-4">
                            {i18n.language === 'en' 
                                ? 'Information & Communication Technology Command'
                                : 'የመረጃ እና ኮምዩኒኬሽን ቴክኖሎጂ ትዕዛዝ'}
                        </span>
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed font-light"
                    >
                        {t('hero.subtitle')}
                    </motion.p>
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link
                            to="/projects"
                            className="btn btn-primary text-lg px-10 py-5 group relative overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <span>{t('hero.explore')}</span>
                                <motion.span
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    →
                                </motion.span>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-ethiopian-green to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>
                        <Link
                            to="/contact"
                            className="btn btn-secondary text-lg px-10 py-5 border-2 border-white text-white hover:bg-white hover:text-primary"
                        >
                            {t('hero.contact')}
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-6 h-10 border-2 border-ethiopian-green/50 rounded-full flex justify-center"
                    >
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1 h-3 bg-ethiopian-green rounded-full mt-2"
                        />
                    </motion.div>
                </motion.div>
            </section>

            {/* Real-Time Data Metrics Section */}
            <section className="section bg-gradient-to-b from-ranger-olive-dark via-ranger-olive to-primary-dark relative overflow-hidden">
                <CamouflagePattern variant="subtle" opacity={0.12} />
                <TechPattern variant="grid" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <p className="section-label text-ethiopian-green">{t('systemStatus.label')}</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                            {t('systemStatus.title')}
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            {t('systemStatus.subtitle')}
                        </p>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <DataMetrics
                            label={t('metrics.networkNodes')}
                            value="247"
                            unit={t('metrics.active')}
                            icon="🌐"
                            colorClass="bg-ethiopian-green"
                        />
                        <DataMetrics
                            label={t('metrics.dataThroughput')}
                            value="98.5"
                            unit="TB/s"
                            icon="📊"
                            colorClass="bg-ethiopian-gold"
                        />
                        <DataMetrics
                            label={t('metrics.securityStatus')}
                            value="99.9"
                            unit="%"
                            icon="🔒"
                            colorClass="bg-ethiopian-green"
                        />
                        <DataMetrics
                            label={t('metrics.uptime')}
                            value="99.97"
                            unit="%"
                            icon="⚡"
                            colorClass="bg-ethiopian-green"
                        />
                    </div>
                </div>
            </section>

            {/* Featured Projects Section */}
            <section className="section bg-gradient-to-b from-ranger-khaki/30 via-white to-ranger-tan-light/20 relative">
                <CamouflagePattern variant="subtle" opacity={0.08} />
                <TechPattern variant="dots" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <p className="section-label">{t('featured.title')}</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                            {t('featured.subtitle')}
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            {t('featured.description')}
                        </p>
                    </motion.div>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="card-grid"
                    >
                        {featuredProjects.length > 0 ? (
                            featuredProjects.map((project, index) => (
                                <motion.div
                                    key={project._id || project.id}
                                    variants={itemVariants}
                                    custom={index}
                                >
                                    <ProjectCard project={project} />
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-center col-span-full text-gray-600">{t('featured.loading')}</p>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Network Infrastructure Visualization */}
            <section className="section bg-gradient-to-br from-ranger-olive-dark via-ranger-olive to-primary-dark relative overflow-hidden">
                <CamouflagePattern variant="organic" opacity={0.15} />
                <TechPattern variant="circuit" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <p className="section-label text-ethiopian-green">{t('network.label')}</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                            {t('network.title')}
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            {t('network.subtitle')}
                        </p>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-gradient-to-br from-primary/20 to-ethiopian-green/10 rounded-2xl p-8 border border-ethiopian-green/30 backdrop-blur-sm"
                    >
                        <div className="h-96">
                            <NetworkVisualization />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Goal Section */}
            <section className="section bg-gradient-to-br from-ranger-khaki/40 via-ranger-tan-light/30 to-ranger-khaki/20 relative overflow-hidden">
                <CamouflagePattern variant="subtle" opacity={0.1} />
                <TechPattern variant="hexagon" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <p className="section-label">{t('goal.title')}</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
                            {t('goal.title')}
                        </h2>
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200/50 relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-ethiopian-green to-primary" />
                            <p className="text-xl md:text-2xl leading-relaxed text-gray-800 mb-6 font-semibold">
                                በኢንፎርሜሽን ኮምዩኒኬሽን ቴክኖሎጂ ኢናቪሽን ላይ የተመሰረቱ የአስራር ስርዓቶች ያሉት ዲጂታል መከላከያን ማየት።
                            </p>
                            <p className="text-lg md:text-xl leading-relaxed text-gray-600 italic">
                                To establish digital protection systems based on Information and Communication Technology (ICT) innovation.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="section bg-gradient-to-br from-white via-ranger-khaki/20 to-ranger-tan-light/15 relative">
                <CamouflagePattern variant="subtle" opacity={0.06} />
                <TechPattern variant="dots" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <p className="section-label">{t('mission.title')}</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
                            {t('mission.title')}
                        </h2>
                        <div className="bg-gradient-to-br from-primary/5 to-ethiopian-green/5 rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200/50 relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ethiopian-green via-primary to-ethiopian-green" />
                            <p className="text-xl md:text-2xl leading-relaxed text-gray-800 mb-6 font-semibold">
                                የኢንፎርሜሽን ኮምዩኒኬሽን ቴክኖሎጂን በማለማትና በማስፋፋት ውጤታማ የኃብት አስተዳደር፣ ደህንነቱ የጠበቀ የኢንፎርሜሽን ፍሰትና ቀልጣፋ የአይሲቲ አገልግሎት በሚረጋገጥ ተቋሙ ተልዕኮውን በብቃት እንዲወጣ መደገፍ።
                            </p>
                            <p className="text-lg md:text-xl leading-relaxed text-gray-600 italic">
                                To support the institution's mission by developing and expanding ICT for efficient resource management, secure information flow, and reliable, fast IT services.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Future Technologies Section */}
            <section className="section bg-gradient-to-b from-ranger-khaki/25 via-white to-ranger-tan/20 relative">
                <CamouflagePattern variant="subtle" opacity={0.08} />
                <TechPattern variant="grid" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <p className="section-label">{t('future.title').toUpperCase()}</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                            {t('future.title')}
                        </h2>
                    </motion.div>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {[
                            { title: t('future.ai'), desc: t('future.ai_desc'), colorClass: 'from-ethiopian-green to-ethiopian-green/50', icon: '🤖' },
                            { title: t('future.quantum'), desc: t('future.quantum_desc'), colorClass: 'from-primary to-primary/50', icon: '⚛️' },
                            { title: t('future.cloud'), desc: t('future.cloud_desc'), colorClass: 'from-ethiopian-gold to-ethiopian-gold/50', icon: '☁️' },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="card group cursor-pointer relative overflow-hidden"
                            >
                                <div className={`h-1 bg-gradient-to-r ${item.colorClass}`} />
                                <div className="card-content">
                                    <div className="text-5xl mb-4">{item.icon}</div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed text-lg">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="section bg-white relative">
                <TechPattern variant="dots" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <p className="section-label">{t('testimonials.title').toUpperCase()}</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                            {t('testimonials.title')}
                        </h2>
                    </motion.div>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                    >
                        {[
                            {
                                quote: "The new secure logistics platform has revolutionized how we track assets across the eastern front. Absolute game changer for operational readiness.",
                                name: "Gen. Marcus Thorne",
                                role: "Commander, Logistics Command",
                                borderColorClass: 'border-ethiopian-green',
                            },
                            {
                                quote: "Cybersecurity training provided by the ICT Office has drastically reduced our vulnerability to phishing attacks. The interactive modules are world-class.",
                                name: "Sarah O'Connell",
                                role: "Director, Personnel Security",
                                borderColorClass: 'border-primary',
                            },
                        ].map((testimonial, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className={`card border-l-4 ${testimonial.borderColorClass} hover:shadow-2xl transition-all duration-300`}
                            >
                                <div className="card-content">
                                    <p className="text-lg italic text-gray-700 mb-6 leading-relaxed">
                                        "{testimonial.quote}"
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-ethiopian-green flex items-center justify-center text-white font-bold text-lg">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                                            <p className="text-sm text-gray-600">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
