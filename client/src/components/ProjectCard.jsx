import React from 'react';
import { Link } from 'react-router-dom';

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
                <Link to={`/projects/${project.id || project._id}`} className="btn btn-secondary" style={{ marginTop: '1rem', display: 'inline-block', padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ProjectCard;
