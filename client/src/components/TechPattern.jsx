import React from 'react';

const TechPattern = ({ variant = 'grid' }) => {
    const patterns = {
        grid: {
            backgroundImage: `linear-gradient(rgba(0, 106, 78, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(0, 106, 78, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
        },
        dots: {
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0, 106, 78, 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
        },
        circuit: {
            backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 106, 78, 0.1) 2px, rgba(0, 106, 78, 0.1) 4px),
                repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 106, 78, 0.1) 2px, rgba(0, 106, 78, 0.1) 4px)
            `,
            backgroundSize: '30px 30px',
        },
        hexagon: {
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23006A4E' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        },
    };

    return (
        <div
            className="absolute inset-0 pointer-events-none"
            style={patterns[variant] || patterns.grid}
        />
    );
};

export default TechPattern;

