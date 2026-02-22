import React from 'react';
import { motion } from 'framer-motion';

const NetworkVisualization = () => {
    const nodes = [
        { id: 1, x: 20, y: 30, label: 'HQ', status: 'active' },
        { id: 2, x: 50, y: 20, label: 'Data Center', status: 'active' },
        { id: 3, x: 80, y: 30, label: 'Field Ops', status: 'active' },
        { id: 4, x: 35, y: 60, label: 'Network Hub', status: 'active' },
        { id: 5, x: 65, y: 60, label: 'Cloud Node', status: 'active' },
    ];

    const connections = [
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 1, to: 4 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
        { from: 3, to: 5 },
        { from: 4, to: 5 },
    ];

    return (
        <div className="relative w-full h-full overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                {/* Animated grid background */}
                <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0, 31, 63, 0.1)" strokeWidth="0.5"/>
                    </pattern>
                    <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#006A4E" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#001F3F" stopOpacity="0.8" />
                    </linearGradient>
                </defs>
                
                <rect width="100" height="100" fill="url(#grid)" />
                
                {/* Connection lines */}
                {connections.map((conn, idx) => {
                    const fromNode = nodes.find(n => n.id === conn.from);
                    const toNode = nodes.find(n => n.id === conn.to);
                    if (!fromNode || !toNode) return null;
                    
                    return (
                        <motion.line
                            key={idx}
                            x1={fromNode.x}
                            y1={fromNode.y}
                            x2={toNode.x}
                            y2={toNode.y}
                            stroke="url(#nodeGradient)"
                            strokeWidth="0.3"
                            strokeDasharray="1,1"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ 
                                pathLength: 1, 
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                pathLength: { duration: 2, delay: idx * 0.2 },
                                opacity: { duration: 2, repeat: Infinity, delay: idx * 0.2 }
                            }}
                        />
                    );
                })}
                
                {/* Network nodes */}
                {nodes.map((node, idx) => (
                    <g key={node.id}>
                        <motion.circle
                            cx={node.x}
                            cy={node.y}
                            r="3"
                            fill="url(#nodeGradient)"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: 1,
                            }}
                            transition={{
                                scale: { duration: 2, repeat: Infinity, delay: idx * 0.3 },
                                opacity: { duration: 0.5, delay: idx * 0.2 }
                            }}
                        />
                        <motion.circle
                            cx={node.x}
                            cy={node.y}
                            r="5"
                            fill="none"
                            stroke="#006A4E"
                            strokeWidth="0.2"
                            opacity="0.5"
                            animate={{
                                r: [5, 8, 5],
                                opacity: [0.5, 0, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: idx * 0.3
                            }}
                        />
                        <text
                            x={node.x}
                            y={node.y + 6}
                            textAnchor="middle"
                            fontSize="2"
                            fill="#001F3F"
                            fontWeight="bold"
                        >
                            {node.label}
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    );
};

export default NetworkVisualization;

