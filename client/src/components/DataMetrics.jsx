import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const DataMetrics = ({ label, value, unit, icon, colorClass = 'bg-ethiopian-green' }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const controls = useAnimation();

    useEffect(() => {
        const targetValue = parseFloat(value) || 0;
        const duration = 2;
        const steps = 60;
        const increment = targetValue / (duration * steps);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetValue) {
                setDisplayValue(targetValue);
                clearInterval(timer);
            } else {
                setDisplayValue(current);
            }
        }, 1000 / steps);

        return () => clearInterval(timer);
    }, [value]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gradient-to-br from-ranger-olive-dark via-ranger-olive to-primary-dark rounded-xl p-6 border border-ranger-tan/40 shadow-xl relative overflow-hidden group"
        >
            {/* Animated background pattern with ranger colors */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(45deg, rgba(85, 107, 47, 0.3) 25%, transparent 25%),
                        linear-gradient(-45deg, rgba(195, 176, 145, 0.3) 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, rgba(139, 115, 85, 0.2) 75%),
                        linear-gradient(-45deg, transparent 75%, rgba(107, 142, 35, 0.2) 75%)
                    `,
                    backgroundSize: '20px 20px',
                }} />
            </div>
            
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{icon}</div>
                    <div className={`w-3 h-3 rounded-full ${colorClass} animate-pulse`} />
                </div>
                <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">{label}</h3>
                <div className="flex items-baseline gap-2">
                    <motion.span
                        className="text-3xl font-bold text-white"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        {displayValue.toFixed(displayValue < 100 ? 1 : 0)}
                    </motion.span>
                    {unit && (
                        <span className="text-lg text-gray-400">{unit}</span>
                    )}
                </div>
            </div>
            
            {/* Progress bar */}
            <div className="mt-4 h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                    className={`h-full ${colorClass === 'bg-ethiopian-green' ? 'bg-gradient-to-r from-ethiopian-green to-ethiopian-green/50' : 'bg-gradient-to-r from-ethiopian-gold to-ethiopian-gold/50'}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.min((displayValue / 100) * 100, 100)}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 2 }}
                />
            </div>
        </motion.div>
    );
};

export default DataMetrics;

