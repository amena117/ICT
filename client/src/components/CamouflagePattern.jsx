import React from 'react';

const CamouflagePattern = ({ variant = 'subtle', opacity = 0.1 }) => {
    const patterns = {
        subtle: {
            backgroundImage: `
                radial-gradient(circle at 20% 30%, rgba(85, 107, 47, ${opacity}) 0%, transparent 50%),
                radial-gradient(circle at 60% 70%, rgba(195, 176, 145, ${opacity}) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(139, 115, 85, ${opacity}) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(107, 142, 35, ${opacity}) 0%, transparent 50%)
            `,
        },
        grid: {
            backgroundImage: `
                linear-gradient(rgba(85, 107, 47, ${opacity}) 1px, transparent 1px),
                linear-gradient(90deg, rgba(195, 176, 145, ${opacity}) 1px, transparent 1px),
                linear-gradient(rgba(139, 115, 85, ${opacity * 0.5}) 1px, transparent 1px),
                linear-gradient(90deg, rgba(107, 142, 35, ${opacity * 0.5}) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px, 40px 40px, 20px 20px, 20px 20px',
        },
        organic: {
            backgroundImage: `
                radial-gradient(ellipse at 25% 25%, rgba(85, 107, 47, ${opacity}) 0%, transparent 40%),
                radial-gradient(ellipse at 75% 75%, rgba(195, 176, 145, ${opacity}) 0%, transparent 40%),
                radial-gradient(ellipse at 50% 50%, rgba(139, 115, 85, ${opacity * 0.7}) 0%, transparent 50%),
                radial-gradient(ellipse at 10% 60%, rgba(107, 142, 35, ${opacity * 0.6}) 0%, transparent 35%),
                radial-gradient(ellipse at 90% 30%, rgba(160, 130, 109, ${opacity * 0.5}) 0%, transparent 35%)
            `,
        },
    };

    return (
        <div
            className="absolute inset-0 pointer-events-none"
            style={patterns[variant] || patterns.subtle}
        />
    );
};

export default CamouflagePattern;

