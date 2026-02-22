import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ProjectCard from '../components/ProjectCard';
import CamouflagePattern from '../components/CamouflagePattern';

const Projects = () => {
    const { t } = useTranslation();
    const [projects, setProjects] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        setLoading(true);
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('limit', 6);
        if (filter !== 'All') params.append('category', filter);
        if (searchTerm) params.append('search', searchTerm);

        fetch(`/api/projects?${params.toString()}`)
            .then(res => res.json())
            .then(data => {
                if (data.pagination) {
                    setProjects(data.data);
                    setTotalPages(data.pagination.totalPages);
                    setTotalItems(data.pagination.totalItems);
                } else if (Array.isArray(data)) {
                    setProjects(data);
                } else {
                    setProjects([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [filter, page, searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setPage(1);
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setPage(1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(p => p - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(p => p + 1);
    };

    const categories = ['All', 'Operational', 'Administrative', 'Training', 'Infrastructure'];

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
        <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-ranger-khaki/30 via-white to-ranger-tan-light/25 relative overflow-hidden">
            <CamouflagePattern variant="subtle" opacity={0.08} />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <p className="section-label">{t('projects.label')}</p>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                        {t('projects.title')}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        {t('projects.subtitle')}
                    </p>
                </motion.div>

                {/* Filter & Search Controls */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-12 space-y-6"
                >
                    {/* Category Filters */}
                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map(cat => (
                            <motion.button
                                key={cat}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleFilterChange(cat)}
                                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                                    filter === cat
                                        ? 'bg-gradient-to-r from-primary to-ethiopian-green text-white shadow-lg'
                                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary hover:text-primary'
                                }`}
                            >
                                {cat}
                            </motion.button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="max-w-md mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder={t('projects.search')}
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-primary focus:outline-none text-lg transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg"
                            />
                            <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                        </div>
                    </div>
                </motion.div>

                {/* Loading State */}
                {loading ? (
                    <div className="text-center py-20">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto"
                        />
                        <p className="mt-4 text-gray-600 text-lg">{t('projects.loading')}</p>
                    </div>
                ) : (
                    <>
                        {/* Projects Grid */}
                        {projects.length > 0 ? (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="card-grid mb-12"
                            >
                                {projects.map((project, index) => (
                                    <motion.div
                                        key={project._id || project.id}
                                        variants={itemVariants}
                                        custom={index}
                                    >
                                        <ProjectCard project={project} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-200"
                            >
                                <p className="text-gray-600 text-lg">{t('projects.noProjects')}</p>
                            </motion.div>
                        )}

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="flex justify-center items-center gap-4 mt-12"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handlePrevPage}
                                    disabled={page === 1}
                                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                                        page === 1
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white shadow-md'
                                    }`}
                                >
                                    {t('projects.previous')}
                                </motion.button>
                                <span className="text-gray-700 font-semibold px-4">
                                    {t('projects.page')} {page} {t('projects.of')} {totalPages}
                                </span>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleNextPage}
                                    disabled={page === totalPages}
                                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                                        page === totalPages
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white shadow-md'
                                    }`}
                                >
                                    {t('projects.next')}
                                </motion.button>
                            </motion.div>
                        )}

                        {/* Results Count */}
                        {totalItems > 0 && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center text-gray-600 mt-6"
                            >
                                {t('projects.showing')} {projects.length} {t('projects.of')} {totalItems} {t('projects.projects')}
                            </motion.p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Projects;
