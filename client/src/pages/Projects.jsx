import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const url = filter === 'All' ? '/api/projects' : `/api/projects?category=${filter}`;
        setLoading(true);
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setProjects(data);
                } else {
                    console.error('API returned non-array:', data);
                    setProjects([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [filter]);

    const categories = ['All', 'Operational', 'Administrative', 'Training', 'Infrastructure'];

    return (
        <div className="container section">
            <h1>Our Portfolio</h1>
            <p style={{ marginBottom: '2rem' }}>Showcasing our contributions to defense digital transformation.</p>

            {/* Filter Controls */}
            <div style={{ marginBottom: '2rem', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`btn ${filter === cat ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setFilter(cat)}
                        style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {loading ? (
                <p>Loading projects...</p>
            ) : (
                <div className="card-grid">
                    {projects.map(project => (
                        <ProjectCard key={project._id || project.id} project={project} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Projects;
