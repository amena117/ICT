import React from 'react';

const About = () => {
    const officials = [
        {
            name: "Gen. Arthur Sterling",
            role: "Chief Information Officer",
            bio: "Leading the ministry's digital transformation with over 30 years of strategic defense experience.",
            imageUrl: "https://placehold.co/150x150/2c3e50/ffffff?text=CIO"
        },
        {
            name: "Sarah Jenkins",
            role: "Deputy Director of Cybersecurity",
            bio: "Expert in threat intelligence and network hardening, ensuring our infrastructure remains impenetrable.",
            imageUrl: "https://placehold.co/150x150/e74c3c/ffffff?text=Sec+Dir"
        },
        {
            name: "Col. James Vance",
            role: "Head of Infrastructure",
            bio: "Overseeing the deployment of resilient cloud nodes and tactical battlefield communications.",
            imageUrl: "https://placehold.co/150x150/2980b9/ffffff?text=Infra+Head"
        }
    ];

    return (
        <div className="container section">
            <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>About the ICT Office</h1>

            <section style={{ marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem auto', textAlign: 'center' }}>
                <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                    The ICT Office is the technological backbone of the Ministry of Defense. We are dedicated to delivering secure, compliant, and innovative digital solutions that empower our forces and streamline operations. From the headquarters to the tactical edge, we ensure information superiority.
                </p>
            </section>

            <section>
                <h2 style={{ textAlign: 'center', marginBottom: '3rem', borderBottom: '2px solid #eee', paddingBottom: '1rem' }}>Leadership & Higher Officials</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
                    {officials.map((person, idx) => (
                        <div key={idx} style={{ textAlign: 'center' }}>
                            <img
                                src={person.imageUrl}
                                alt={person.name}
                                style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1.5rem', border: '4px solid #fff', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                            />
                            <h3 style={{ margin: '0.5rem 0', color: '#2C3E50' }}>{person.name}</h3>
                            <h4 style={{ margin: '0 0 1rem 0', color: '#7f8c8d', fontSize: '1rem', fontWeight: 'normal' }}>{person.role}</h4>
                            <p style={{ fontSize: '0.95rem', color: '#555' }}>{person.bio}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;
