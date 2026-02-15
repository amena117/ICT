import React, { useState, useEffect } from 'react';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
        fetch('/api/services')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setServices(data);
                } else if (data.data && Array.isArray(data.data)) {
                    setServices(data.data);
                } else {
                    setServices([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load services:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container section">
            <h1 style={{ marginBottom: '0.5rem' }}>Our Services/Capabilities</h1>
            <p style={{ marginBottom: '2rem' }}>Comprehensive ICT solutions for the modern defense landscape.</p>

            {loading ? (
                <p>Loading services...</p>
            ) : (
                <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {services.map((s, idx) => (
                            <div key={s._id || idx} style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                {s.icon && <i className={`fas ${s.icon}`} style={{ fontSize: '2rem', color: '#3498db', marginBottom: '1rem' }}></i>}

                                <h3 style={{ color: '#2C3E50', marginBottom: '0.5rem' }}>{s.title}</h3>
                                {s.title_am && <h4 style={{ color: '#7f8c8d', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{s.title_am}</h4>}

                                <p style={{ color: '#34495e' }}>{s.description}</p>
                                {s.description_am && <p style={{ color: '#7f8c8d', marginTop: '0.5rem', fontSize: '0.95rem' }}>{s.description_am}</p>}
                            </div>
                        ))}
                    </div>

                    {services.length === 0 && <p>No services found. Please add them via the Admin Dashboard.</p>}
                </>
            )}
        </div>
    );
};

export default Services;
