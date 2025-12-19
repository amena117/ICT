import React from 'react';

const ProjectCard = ({ project }) => {
    return (
        <div className="card">
            <img src={project.imageUrl || 'https://placehold.co/600x400'} alt={project.title} className="card-image" />
            <div className="card-content">
                <div className="card-meta">
                    <span className="badge">{project.category}</span>
                </div>
                <h3 className="card-title">{project.title}</h3>
                <p>{project.description}</p>
                <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                    <strong>Outcome:</strong> {project.outcome}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
