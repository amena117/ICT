const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Project = require('../models/Project');
const News = require('../models/News');

// --- MOCK DATA FOR FALLBACK ---
const MOCK_PROJECTS = [
    {
        id: 1,
        title: "Camp Inventory Management System",
        description: "A secure, centralized platform for tracking logistics and supplies across 5 major military bases.",
        category: "Operational",
        technologies: ["React", "Node.js", "PostgreSQL"],
        outcome: "Auditing time reduced by 60%.",
        imageUrl: "https://placehold.co/600x400/2c3e50/ffffff?text=Inventory+System"
    },
    {
        id: 2,
        title: "Military Court Management Portal",
        description: "Digitized case scheduling and document management for the legal division.",
        category: "Administrative",
        technologies: ["Angular", "Java Spring", "Encrypted DB"],
        outcome: "Eliminated paper backlog completely.",
        imageUrl: "https://placehold.co/600x400/2c3e50/ffffff?text=Court+System"
    },
    {
        id: 3,
        title: "Cybersecurity Awareness Training Module",
        description: "Interactive e-learning platform for all ministry personnel.",
        category: "Training",
        technologies: ["HTML5", "SCORM", "LMS"],
        outcome: "Phishing susceptibility dropped by 45%.",
        imageUrl: "https://placehold.co/600x400/2c3e50/ffffff?text=Cyber+Training"
    },
    {
        id: 4,
        title: "Secure Comm Gateway",
        description: "Encrypted communication channels for field operatives.",
        category: "Infrastructure",
        technologies: ["Rust", "WebAssembly"],
        outcome: "Zero breaches in pilot phase.",
        imageUrl: "https://placehold.co/600x400/2c3e50/ffffff?text=Secure+Gateway"
    }
];

const MOCK_NEWS = [
    {
        id: 101,
        title: "ICT Office Launches New Secure Gateway",
        summary: "Enhanced border protocols now active for all internal networks. This major upgrade ensures...",
        content: "The ICT Office is proud to announce the full deployment of our new Secure Gateway protocol. This system introduces multi-layer encryption for all cross-border data traffic, ensuring that sensitive ministry operations remain impervious to interception. The rollout covers all 15 regional command centers.",
        important: true,
        date: new Date('2025-10-15'),
        imageUrl: "https://placehold.co/800x400/27ae60/ffffff?text=Secure+Gateway+Launch"
    },
    {
        id: 102,
        title: "Annual Hackathon Winners Announced",
        summary: "Team Alpha took first place with their drone detection algorithm.",
        content: "After 48 hours of intense coding, Team Alpha from the Cyber Defense Unit emerged victorious. Their innovative algorithm for detecting low-altitude commercial drones using existing radio infrastructure has already been fast-tracked for prototyping.",
        important: false,
        date: new Date('2025-11-20'),
        imageUrl: "https://placehold.co/800x400/2980b9/ffffff?text=Hackathon+Winners"
    },
    {
        id: 103,
        title: "New Cloud Infrastructure Training",
        summary: "Mandatory upskilling for all IT personnel starting next month.",
        content: "To support our shift to a hybrid cloud architecture, the ICT Office is launching a comprehensive training program. All certified sysadmins are required to complete the 'Secure Cloud Ops' module by Q1 2026.",
        important: false,
        date: new Date('2025-12-05'),
        imageUrl: "https://placehold.co/800x400/e67e22/ffffff?text=Cloud+Training"
    }
];

// Helper to check DB status
// If readyState is 1 (connected), return true. Otherwise false.
const isDbConnected = () => mongoose.connection.readyState === 1;

// --- PROJECTS ENDPOINTS ---

router.get('/projects', async (req, res) => {
    // console.log('GET /projects'); // Debug
    try {
        const { category, search } = req.query;

        if (!isDbConnected()) {
            // console.log('Serving Mock Projects');
            let data = [...MOCK_PROJECTS];
            if (category && category !== 'All') {
                data = data.filter(p => p.category === category);
            }
            if (search) {
                const lowerSearch = search.toLowerCase();
                data = data.filter(p => p.title.toLowerCase().includes(lowerSearch) || p.description.toLowerCase().includes(lowerSearch));
            }
            return res.json(data);
        }

        let query = {};
        if (category && category !== 'All') {
            query.category = category;
        }
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const projects = await Project.find(query).sort({ createdAt: -1 });
        if (projects.length === 0) {
            console.warn('Database Empty. Serving mock projects.');
            return res.json(MOCK_PROJECTS);
        }
        res.json(projects);
    } catch (err) {
        console.error("API Error:", err);
        res.json(MOCK_PROJECTS);
    }
});

// --- NEWS ENDPOINTS ---

router.get('/news', async (req, res) => {
    // console.log('GET /news');
    try {
        if (!isDbConnected()) {
            return res.json(MOCK_NEWS);
        }

        const news = await News.find().sort({ date: -1 }).limit(10);
        if (news.length === 0) {
            console.warn('Database Empty. Serving mock news.');
            return res.json(MOCK_NEWS);
        }
        res.json(news);
    } catch (err) {
        console.error("API Error:", err);
        res.json(MOCK_NEWS);
    }
});

router.get('/news/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!isDbConnected()) {
            const item = MOCK_NEWS.find(n => n.id == id);
            return item ? res.json(item) : res.status(404).json({ message: 'News not found' });
        }

        const item = await News.findById(id);
        res.json(item);
    } catch (err) {
        // Fallback for ID mismatch or error
        const item = MOCK_NEWS.find(n => n.id == req.params.id);
        return item ? res.json(item) : res.status(404).json({ message: 'News not found' });
    }
});

// --- SEED ENDPOINT ---
router.post('/seed', async (req, res) => {
    try {
        if (!isDbConnected()) {
            return res.status(200).json({ message: "Database Disconnected: Using In-Memory Mock Data (No action needed)" });
        }

        await Project.deleteMany({});
        await News.deleteMany({});
        await Project.insertMany(MOCK_PROJECTS);
        await News.insertMany(MOCK_NEWS);

        res.json({ message: "Database seeded successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
