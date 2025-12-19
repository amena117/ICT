import React from 'react';

const Services = () => {
    const services = [
        { title: "Web System Development", desc: "Custom secure web applications tailored to defense needs." },
        { title: "IT Infrastructure", desc: "Robust networking and server management." },
        { title: "Cybersecurity", desc: "Vulnerability assessments and secure coding audits." },
        { title: "Digital Training", desc: "Upskilling personnel in modern digital tools." }
    ];

    return (
        <div className="container section">
            <h1>Our Services/Capabilities</h1>
            <p style={{ marginBottom: '2rem' }}>Comprehensive ICT solutions for the modern defense landscape.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                {services.map((s, idx) => (
                    <div key={idx} style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ color: '#2C3E50', marginBottom: '0.5rem' }}>{s.title}</h3>
                        <p>{s.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
