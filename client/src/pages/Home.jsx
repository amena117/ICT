import React, { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();
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
                    <h1>{t('hero.title')}</h1>
                    <p>{t('hero.subtitle')}</p>
                    <div>
                        <a href="/projects" className="btn btn-primary" style={{ marginRight: '1rem' }}>{t('hero.explore')}</a>
                        <a href="/contact" className="btn btn-secondary" style={{ color: 'white', borderColor: 'white' }}>{t('nav.contact')}</a>
                    </div>
                </div>
            </section>

            <section className="section container">
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>{t('featured.title')}</h2>
                <div className="card-grid">
                    {featuredProjects.length > 0 ? (
                        featuredProjects.map(project => (
                            <ProjectCard key={project._id || project.id} project={project} />
                        ))
                    ) : (
                        <p className="text-center">{t('featured.loading')}</p>
                    )}
                </div>
            </section>

            <section className="section" style={{ backgroundColor: '#fff' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>{t('mission.title')}</h2>
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <p style={{ fontSize: '1.1rem' }}>
                            {t('mission.text')}
                        </p>
                    </div>
                </div>
            </section>

            <section className="section container">
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>{t('future.title')}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    <div className="card" style={{ padding: '2rem', textAlign: 'center', borderTop: '4px solid #27AE60' }}>
                        <h3 style={{ marginBottom: '1rem', color: '#2C3E50' }}>{t('future.ai')}</h3>
                        <p>{t('future.ai_desc')}</p>
                    </div>
                    <div className="card" style={{ padding: '2rem', textAlign: 'center', borderTop: '4px solid #3498DB' }}>
                        <h3 style={{ marginBottom: '1rem', color: '#2C3E50' }}>{t('future.quantum')}</h3>
                        <p>{t('future.quantum_desc')}</p>
                    </div>
                    <div className="card" style={{ padding: '2rem', textAlign: 'center', borderTop: '4px solid #E67E22' }}>
                        <h3 style={{ marginBottom: '1rem', color: '#2C3E50' }}>{t('future.cloud')}</h3>
                        <p>{t('future.cloud_desc')}</p>
                    </div>
                </div>
            </section>

            <section className="section container">
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>{t('testimonials.title')}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div className="card" style={{ padding: '2rem', borderLeft: '4px solid #27AE60' }}>
                        <p style={{ fontStyle: 'italic', marginBottom: '1rem', color: '#555' }}>"The new secure logistics platform has revolutionized how we track assets across the eastern front. Absolute game changer for operational readiness."</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <img src="https://placehold.co/50x50/2c3e50/ffffff?text=Gen" alt="General" style={{ borderRadius: '50%' }} />
                            <div>
                                <h4 style={{ margin: 0, color: '#2C3E50' }}>Gen. Marcus Thorne</h4>
                                <small style={{ color: '#7f8c8d' }}>Commander, Logistics Command</small>
                            </div>
                        </div>
                    </div>
                    <div className="card" style={{ padding: '2rem', borderLeft: '4px solid #2980b9' }}>
                        <p style={{ fontStyle: 'italic', marginBottom: '1rem', color: '#555' }}>"Cybersecurity training provided by the ICT Office has drastically reduced our vulnerability to phishing attacks. The interactive modules are world-class."</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <img src="https://placehold.co/50x50/e74c3c/ffffff?text=Dir" alt="Director" style={{ borderRadius: '50%' }} />
                            <div>
                                <h4 style={{ margin: 0, color: '#2C3E50' }}>Sarah O'Connell</h4>
                                <small style={{ color: '#7f8c8d' }}>Director, Personnel Security</small>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
