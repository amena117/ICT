import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ResourceCard = ({ resource }) => {
    const { t } = useTranslation();
    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="card group cursor-pointer overflow-hidden flex flex-col h-full relative"
        >
            <div className="relative overflow-hidden shrink-0">
                <img
                    src={resource.imageUrl || 'https://placehold.co/600x400'}
                    alt={resource.title}
                    className="card-image group-hover:scale-110 transition-transform duration-500 w-full h-48 object-cover"
                />
            </div>
            
            <div className="card-content flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                    <span className="badge bg-gradient-to-r from-ranger-olive to-ranger-olive-light">
                        {resource.type}
                    </span>
                </div>

                <h3 className="card-title group-hover:text-ranger-olive-dark transition-colors duration-300 line-clamp-2">
                    {resource.title}
                </h3>

                <p className="text-gray-700 leading-relaxed mb-4 line-clamp-3 flex-grow">
                    {resource.summary}
                </p>

                <Link
                    to={`/resources/${resource._id || resource.id}`}
                    className="inline-flex items-center gap-2 text-ranger-olive-dark font-semibold hover:gap-3 transition-all duration-300 group/link mt-auto z-10"
                >
                    <span>{t('resourcesPage.readArticle')}</span>
                    <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-ranger-olive"
                    >
                        →
                    </motion.span>
                </Link>
            </div>

            {/* Hover overlay effect */}
            <div className="absolute inset-0 bg-ethiopian-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </motion.div>
    );
};

export default ResourceCard;
