import React, { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';

const Home = () => {
    const [featuredProjects, setFeaturedProjects] = useState([]);

    useEffect(() => {
        // Fetch top 3 projects from API
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setFeaturedProjects(data.slice(0, 3));
                } else {
                    console.error('API returned non-array:', data);
                    setFeaturedProjects([]);
                }
            })
            .catch(err => console.error('Error fetching projects:', err));
    }, []);

    return (
        <div>
            <section className="hero" style={{ backgroundImage: "linear-gradient(rgba(44, 62, 80, 0.9), rgba(44, 62, 80, 0.8)), url('/hero.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container">
                    <h1>Securing the Digital Frontier</h1>
                    <p>Delivering secure, innovative web systems to support Ministry of Defense operations.</p>
                    <div>
                        <a href="/projects" className="btn btn-primary" style={{ marginRight: '1rem' }}>Explore Projects</a>
                        <a href="/contact" className="btn btn-secondary" style={{ color: 'white', borderColor: 'white' }}>Contact Us</a>
                    </div>
                </div>
            </section>

            <section className="section container">
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Featured Projects</h2>
                <div className="card-grid">
                    {featuredProjects.length > 0 ? (
                        featuredProjects.map(project => (
                            <ProjectCard key={project._id || project.id} project={project} />
                        ))
                    ) : (
                        <p className="text-center">Loading secure data...</p>
                    )}
                </div>
            </section>

            <section className="section" style={{ backgroundColor: '#fff' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Our Mission</h2>
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <p style={{ fontSize: '1.1rem' }}>
                            To provide the Ministry of Defense with cutting-edge, resilient, and user-centric digital solutions that enhance operational efficiency and data security.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section container">
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Future Initiatives 2030</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    <div className="card" style={{ padding: '2rem', textAlign: 'center', borderTop: '4px solid #27AE60' }}>
                        <h3 style={{ marginBottom: '1rem', color: '#2C3E50' }}>AI Defense</h3>
                        <p>Integrating autonomous threat detection algorithms into national grid systems.</p>
                    </div>
                    <div className="card" style={{ padding: '2rem', textAlign: 'center', borderTop: '4px solid #3498DB' }}>
                        <h3 style={{ marginBottom: '1rem', color: '#2C3E50' }}>Quantum Cryptography</h3>
                        <p>Developing post-quantum encryption standards for classified communications.</p>
                    </div>
                    <div className="card" style={{ padding: '2rem', textAlign: 'center', borderTop: '4px solid #E67E22' }}>
                        <h3 style={{ marginBottom: '1rem', color: '#2C3E50' }}>Battlefield Edge Cloud</h3>
                        <p>Deploying decentralized cloud nodes for real-time tactical data processing.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
