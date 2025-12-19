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

const Resource = require('../models/Resource');

const MOCK_RESOURCES = [
    {
        id: 201,
        title: "Securing the Digital Supply Chain",
        type: "Whitepaper",
        summary: "Best practices for vetting third-party software vendors in defense contracts.",
        content: "Supply chain attacks are rising. This whitepaper outlines the new 'verify-then-trust' framework adopted by the Ministry for all software procurement. It details the required SBOM (Software Bill of Materials) standards and the continuous monitoring protocols for deployed dependencies.",
        author: "Chief Information Security Officer",
        tags: ["Security", "Supply Chain", "Policy"],
        date: new Date('2025-09-10'),
        imageUrl: "https://placehold.co/600x400/2c3e50/ffffff?text=Supply+Chain+Security"
    },
    {
        id: 202,
        title: "Intro to Post-Quantum Cryptography",
        type: "Tutorial",
        summary: "A primer on lattice-based cryptography and migration strategies for legacy systems.",
        content: "As quantum computing approaches viability, current RSA encryption methods become vulnerable. This tutorial breaks down the math behind lattice-based cryptography and provides a step-by-step guide for developers to start testing PQC algorithms in their non-classified environments using the new Ministry CryptoLib v4.",
        author: "Dr. A. Turing",
        tags: ["Cryptography", "Quantum", "DevOps"],
        date: new Date('2025-10-05'),
        imageUrl: "https://placehold.co/600x400/8e44ad/ffffff?text=Quantum+Crypto"
    },
    {
        id: 203,
        title: "AI Ethics in Autonomous Systems",
        type: "Article",
        summary: "Defining the boundaries of AI decision-making in kinetic environments.",
        content: "The ethical deployment of AI in autonomous defense systems is paramount. This article explores the 'Human-on-the-Loop' doctrine, ensuring that lethal force decisions always retain human oversight while leveraging AI for rapid threat identification and trajectory analysis.",
        author: "Strategic Studies Group",
        tags: ["AI", "Ethics", "Policy"],
        date: new Date('2025-11-12'),
        imageUrl: "https://placehold.co/600x400/27ae60/ffffff?text=AI+Ethics"
    }
];

// --- RESOURCES ENDPOINTS ---

router.get('/resources', async (req, res) => {
    try {
        const { type, search } = req.query;

        if (!isDbConnected()) {
            let data = [...MOCK_RESOURCES];
            if (type && type !== 'All') {
                data = data.filter(r => r.type === type);
            }
            if (search) {
                const lowerSearch = search.toLowerCase();
                data = data.filter(r => r.title.toLowerCase().includes(lowerSearch) || r.tags.some(t => t.toLowerCase().includes(lowerSearch)));
            }
            return res.json(data);
        }

        let query = {};
        if (type && type !== 'All') {
            query.type = type;
        }
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { 'tags': { $regex: search, $options: 'i' } }
            ];
        }

        const resources = await Resource.find(query).sort({ date: -1 });
        if (resources.length === 0) {
            console.warn('Database Empty. Serving mock resources.');
            return res.json(MOCK_RESOURCES);
        }
        res.json(resources);
    } catch (err) {
        console.error("API Error:", err);
        res.json(MOCK_RESOURCES);
    }
});

router.get('/resources/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!isDbConnected()) {
            const item = MOCK_RESOURCES.find(r => r.id == id);
            return item ? res.json(item) : res.status(404).json({ message: 'Resource not found' });
        }

        const item = await Resource.findById(id);
        res.json(item);
    } catch (err) {
        // Fallback
        const item = MOCK_RESOURCES.find(r => r.id == req.params.id);
        return item ? res.json(item) : res.status(404).json({ message: 'Resource not found' });
    }
});
router.post('/seed', async (req, res) => {
    try {
        if (!isDbConnected()) {
            return res.status(200).json({ message: "Database Disconnected: Using In-Memory Mock Data (No action needed)" });
        }

        await Project.deleteMany({});
        await News.deleteMany({});
        await Resource.deleteMany({});
        await Project.insertMany(MOCK_PROJECTS);
        await News.insertMany(MOCK_NEWS);
        await Resource.insertMany(MOCK_RESOURCES);

        res.json({ message: "Database seeded successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
