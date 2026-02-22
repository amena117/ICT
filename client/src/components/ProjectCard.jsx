import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ProjectCard = ({ project }) => {
    const { t } = useTranslation();
    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="card group cursor-pointer overflow-hidden"
        >
            <div className="relative overflow-hidden">
                <img
                    src={project.imageUrl || 'https://placehold.co/600x400'}
                    alt={project.title}
                    className="card-image group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="card-content">
                <div className="flex items-center gap-2 mb-3">
                    <span className="badge bg-gradient-to-r from-ranger-olive to-ranger-olive-light">{project.category}</span>
                </div>
                <h3 className="card-title group-hover:text-ranger-olive-dark transition-colors duration-300">
                    {project.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                </p>
                {project.outcome && (
                    <div className="mb-4 p-3 bg-gradient-to-r from-ranger-tan/20 to-ranger-olive/10 rounded-lg border-l-4 border-ranger-olive">
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                            {t('projects.outcome', { defaultValue: 'Outcome:' })}
                        </p>
                        <p className="text-sm text-gray-700">{project.outcome}</p>
                    </div>
                )}
                <Link
                    to={`/projects/${project.id || project._id}`}
                    className="inline-flex items-center gap-2 text-ranger-olive-dark font-semibold hover:gap-3 transition-all duration-300 group/link"
                >
                    <span>{t('services.viewDetails')}</span>
                    <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-ranger-olive"
                    >
                        →
                    </motion.span>
                </Link>
            </div>
            {/* Hover border effect with ranger colors */}
            <div className="absolute inset-0 border-t-4 bg-gradient-to-r from-ranger-olive via-ranger-tan to-ranger-olive opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </motion.div>
    );
};

export default ProjectCard;
