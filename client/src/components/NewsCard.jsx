import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NewsCard = ({ item }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="card group cursor-pointer overflow-hidden flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl relative"
        >
            <div className="relative overflow-hidden h-56 shrink-0">
                <img
                    src={item.imageUrl || 'https://placehold.co/600x400'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-500">
                        {new Date(item.date).toLocaleDateString()}
                    </span>
                    {item.important && (
                        <span className="px-3 py-1 text-xs font-bold tracking-wider text-white bg-red-500 rounded-full uppercase shadow-sm">
                            IMPORTANT
                        </span>
                    )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 mb-3 line-clamp-2">
                    {item.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {item.summary}
                </p>

                <Link
                    to={`/news/${item.id || item._id}`}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 group/link mt-auto"
                >
                    <span>Read More</span>
                    <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-primary"
                    >
                        →
                    </motion.span>
                </Link>
            </div>

            {/* Hover border effect */}
            <div className="absolute inset-0 border-t-4 bg-gradient-to-r from-primary via-ethiopian-yellow to-ethiopian-green opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
        </motion.div>
    );
};

export default NewsCard;
