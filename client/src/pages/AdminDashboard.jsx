import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Reusable Form Component
const EntityForm = ({ title, fields, initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState(initialData || {});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, imageUrl: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>{initialData ? 'Edit' : 'Create'} {title}</h3>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {fields.map(field => (
                    <div key={field.name} style={{ gridColumn: field.fullWidth ? '1 / -1' : 'auto' }}>
                        <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 'bold' }}>
                            {field.label} {field.lang && <span style={{ fontSize: '0.8em', color: '#7f8c8d' }}>({field.lang})</span>}
                        </label>
                        {field.type === 'textarea' ? (
                            <textarea
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '0.5rem', minHeight: '80px' }}
                                required={field.required}
                            />
                        ) : field.type === 'select' ? (
                            <select
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '0.5rem' }}
                            >
                                <option value="">Select...</option>
                                {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        ) : field.type === 'checkbox' ? (
                            <input
                                type="checkbox"
                                name={field.name}
                                checked={formData[field.name] || false}
                                onChange={handleChange}
                                style={{ transform: 'scale(1.5)', marginLeft: '0.5rem' }}
                            />
                        ) : (
                            <input
                                type={field.type || 'text'}
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '0.5rem' }}
                                required={field.required}
                            />
                        )}
                    </div>
                ))}

                <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 'bold' }}>Image</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginBottom: '0.5rem' }} />
                    {formData.imageUrl && (
                        <div style={{ marginTop: '0.5rem' }}>
                            <img src={formData.imageUrl} alt="Preview" style={{ height: '80px', borderRadius: '4px' }} />
                        </div>
                    )}
                </div>

                <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button type="submit" className="btn btn-primary">{initialData ? 'Update' : 'Create'}</button>
                    <button type="button" onClick={onCancel} className="btn" style={{ background: '#95a5a6', color: 'white' }}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

// STATS COMPONENT
const DashboardStats = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('/api/stats', { headers: { Authorization: `Bearer ${token}` } });
                setStats(res.data);
            } catch (err) {
                console.error("Failed to load stats:", err);
                setStats({
                    news: 0, projects: 0, resources: 0, totalViews: 0,
                    topNews: [], topProjects: [], topResources: []
                });
            }
        };
        fetchStats();
    }, []);

    if (!stats) return <p>Loading stats...</p>;

    const cards = [
        { label: 'Total News', value: stats.news, color: '#3498db' },
        { label: 'Total Projects', value: stats.projects, color: '#e67e22' },
        { label: 'Total Resources', value: stats.resources, color: '#9b59b6' },
        { label: 'Total Views', value: stats.totalViews, color: '#2ecc71' },
    ];

    const TopList = ({ title, items }) => (
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', flex: 1, minWidth: '300px' }}>
            <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', fontSize: '1.2rem', color: '#2c3e50' }}>{title}</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f8f9fa', textAlign: 'left' }}>
                        <th style={{ padding: '0.8rem' }}>Title</th>
                        <th style={{ padding: '0.8rem' }}>Views</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(n => (
                        <tr key={n._id || n.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '0.8rem', fontSize: '0.95rem' }}>{n.title}</td>
                            <td style={{ padding: '0.8rem', fontWeight: 'bold', color: '#2ecc71' }}>{n.views || 0}</td>
                        </tr>
                    ))}
                    {items.length === 0 && <tr><td colSpan="2" style={{ padding: '1rem', textAlign: 'center' }}>No views yet.</td></tr>}
                </tbody>
            </table>
        </div>
    );

    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                {cards.map(c => (
                    <div key={c.label} style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', borderLeft: `5px solid ${c.color}`, boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ margin: 0, fontSize: '2rem', color: '#2c3e50' }}>{c.value}</h3>
                        <p style={{ margin: 0, color: '#7f8c8d' }}>{c.label}</p>
                    </div>
                ))}
            </div>

            <h2 style={{ marginBottom: '1.5rem', color: '#2c3e50' }}>🔥 Top Viewed Content</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                <TopList title="Top News" items={stats.topNews || []} />
                <TopList title="Top Projects" items={stats.topProjects || []} />
                <TopList title="Top Resources" items={stats.topResources || []} />
            </div>
        </div>
    );
};

// Main Dashboard Component
const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, news, projects, resources, services
    const [data, setData] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        if (activeTab !== 'dashboard') {
            fetchData();
        }
        setEditingItem(null);
        setIsCreating(false);
    }, [activeTab]);

    const fetchData = async () => {
        try {
            const res = await axios.get(`/api/${activeTab}`);
            setData(Array.isArray(res.data) ? res.data : []);
        } catch (err) { console.error(err); }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    const handleSave = async (formData) => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            if (editingItem) {
                await axios.put(`/api/${activeTab}/${editingItem._id || editingItem.id}`, formData, config);
            } else {
                await axios.post(`/api/${activeTab}`, formData, config);
            }
            fetchData();
            setEditingItem(null);
            setIsCreating(false);
            alert('Saved successfully!');
        } catch (err) {
            alert('Error saving data');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this item?')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/${activeTab}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            fetchData();
        } catch (err) { alert('Error deleting item'); }
    };

    // Configuration for Fields based on Tab
    const getFields = () => {
        const common = [
            { name: 'title', label: 'Title', lang: 'English', required: true },
            { name: 'title_am', label: 'Title', lang: 'Amharic', required: false },
        ];

        switch (activeTab) {
            case 'news': return [
                ...common,
                { name: 'summary', label: 'Summary', lang: 'English', type: 'textarea', required: true },
                { name: 'summary_am', label: 'Summary', lang: 'Amharic', type: 'textarea' },
                { name: 'content', label: 'Content', lang: 'English', type: 'textarea', fullWidth: true },
                { name: 'content_am', label: 'Content', lang: 'Amharic', type: 'textarea', fullWidth: true },
                { name: 'category', label: 'Category', type: 'select', options: ['General', 'Security', 'Training'] },
                { name: 'important', label: 'Important (Pin)', type: 'checkbox' }
            ];
            case 'projects': return [
                ...common,
                { name: 'description', label: 'Description', lang: 'English', type: 'textarea', required: true },
                { name: 'description_am', label: 'Description', lang: 'Amharic', type: 'textarea' },
                { name: 'outcome', label: 'Outcome', lang: 'English' },
                { name: 'outcome_am', label: 'Outcome', lang: 'Amharic' },
                { name: 'category', label: 'Category', type: 'select', options: ['Administrative', 'Operational', 'Infrastructure', 'Training'] },
                { name: 'status', label: 'Status', type: 'select', options: ['Ongoing', 'Completed', 'Planned'] }
            ];
            case 'resources': return [
                ...common,
                { name: 'summary', label: 'Summary', type: 'textarea', required: true },
                { name: 'summary_am', label: 'Summary', lang: 'Amharic', type: 'textarea' },
                { name: 'content', label: 'Content', type: 'textarea', fullWidth: true },
                { name: 'content_am', label: 'Content', lang: 'Amharic', type: 'textarea', fullWidth: true },
                { name: 'type', label: 'Type', type: 'select', options: ['Article', 'Tutorial', 'Whitepaper'] },
                { name: 'author', label: 'Author' }
            ];
            case 'services': return [
                ...common,
                { name: 'description', label: 'Description', required: true },
                { name: 'description_am', label: 'Description', lang: 'Amharic' },
                { name: 'icon', label: 'Icon Code (e.g., fa-shield)' }
            ];
            default: return [];
        }
    };

    return (
        <div className="container section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Admin Dashboard - {activeTab === 'dashboard' ? 'Overview' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
                <button onClick={handleLogout} className="btn" style={{ border: '1px solid #c0392b', color: '#c0392b' }}>Logout</button>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '1rem', borderBottom: '2px solid #ddd', marginBottom: '2rem', overflowX: 'auto' }}>
                {['dashboard', 'news', 'projects', 'resources', 'services'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '1rem 2rem',
                            background: activeTab === tab ? '#2c3e50' : 'transparent',
                            color: activeTab === tab ? 'white' : '#2c3e50',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            borderTopLeftRadius: '8px',
                            borderTopRightRadius: '8px',
                            borderBottom: activeTab === tab ? 'none' : '1px solid transparent'
                        }}
                    >
                        {tab.toUpperCase()}
                    </button>
                ))}
            </div>

            {activeTab === 'dashboard' && <DashboardStats />}

            {activeTab !== 'dashboard' && (
                <>
                    {/* Actions */}
                    {!isCreating && !editingItem && (
                        <button onClick={() => setIsCreating(true)} className="btn btn-primary" style={{ marginBottom: '2rem' }}>
                            + Add New {activeTab.slice(0, -1)}
                        </button>
                    )}

                    {/* Form */}
                    {(isCreating || editingItem) && (
                        <EntityForm
                            title={activeTab.slice(0, -1)}
                            fields={getFields()}
                            initialData={editingItem}
                            onSubmit={handleSave}
                            onCancel={() => { setIsCreating(false); setEditingItem(null); }}
                        />
                    )}

                    {/* List */}
                    {!isCreating && !editingItem && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            {data.map(item => (
                                <div key={item._id || item.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: `4px solid #27ae60` }}>
                                    {item.imageUrl && <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px', marginBottom: '1rem' }} />}
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                                    {item.title_am && <h4 style={{ fontSize: '1rem', color: '#7f8c8d', marginBottom: '0.5rem' }}>{item.title_am}</h4>}
                                    {item.views !== undefined && <p style={{ fontSize: '0.9rem', color: '#27ae60', fontWeight: 'bold' }}>👁 {item.views} Views</p>}
                                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                                        <button onClick={() => setEditingItem(item)} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', background: '#f39c12', color: 'white' }}>Edit</button>
                                        <button onClick={() => handleDelete(item._id || item.id)} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', background: '#e74c3c', color: 'white' }}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AdminDashboard;
