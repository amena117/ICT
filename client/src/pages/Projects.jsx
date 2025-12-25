import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    // Pagination & Search State
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        setLoading(true);
        // Build query params
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('limit', 6);
        if (filter !== 'All') params.append('category', filter);
        if (searchTerm) params.append('search', searchTerm);

        fetch(`/api/projects?${params.toString()}`)
            .then(res => res.json())
            .then(data => {
                if (data.pagination) {
                    setProjects(data.data);
                    setTotalPages(data.pagination.totalPages);
                    setTotalItems(data.pagination.totalItems);
                } else if (Array.isArray(data)) {
                    setProjects(data);
                } else {
                    setProjects([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [filter, page, searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setPage(1);
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setPage(1);
    }

    const handlePrevPage = () => {
        if (page > 1) setPage(p => p - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(p => p + 1);
    };

    const categories = ['All', 'Operational', 'Administrative', 'Training', 'Infrastructure'];

    return (
        <div className="container section">
            <h1>Our Portfolio</h1>
            <p style={{ marginBottom: '2rem' }}>Showcasing our contributions to defense digital transformation.</p>

            {/* Filter & Search Controls */}
            <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`btn ${filter === cat ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => handleFilterChange(cat)}
                            style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{
                        padding: '0.8rem',
                        fontSize: '1rem',
                        width: '100%',
                        maxWidth: '400px',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                    }}
                />
            </div>

            {loading ? (
                <p>Loading projects...</p>
            ) : (
                <>
                    <div className="card-grid">
                        {projects.map(project => (
                            <ProjectCard key={project._id || project.id} project={project} />
                        ))}
                    </div>

                    {projects.length === 0 && <p>No projects found.</p>}

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
                            <button
                                className="btn btn-secondary"
                                onClick={handlePrevPage}
                                disabled={page === 1}
                                style={{ opacity: page === 1 ? 0.5 : 1, cursor: page === 1 ? 'not-allowed' : 'pointer' }}
                            >
                                Previous
                            </button>
                            <span>Page {page} of {totalPages}</span>
                            <button
                                className="btn btn-secondary"
                                onClick={handleNextPage}
                                disabled={page === totalPages}
                                style={{ opacity: page === totalPages ? 0.5 : 1, cursor: page === totalPages ? 'not-allowed' : 'pointer' }}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Projects;
