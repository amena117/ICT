const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Models
const Project = require('../models/Project');
const News = require('../models/News');
const Resource = require('../models/Resource');
const Service = require('../models/Service');

// --- AUTH CONFIG ---
const JWT_SECRET = 'ministry_secret_key_123';
const ADMIN_USER = { username: 'admin', password: 'password123' };

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
        const token = jwt.sign({ username: username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// --- MOCK DATA ---
const MOCK_PROJECTS = [
    {
        id: 1,
        title: "Camp Inventory Management System",
        title_am: "የካምፕ ንብረት አስተዳደር ስርዓት",
        description: "A secure, centralized platform for tracking logistics and supplies across 5 major military bases.",
        description_am: "በ 5 ዋና ዋና ወታደራዊ ሰፈሮች ውስጥ ሎጂስቲክስን እና አቅርቦቶችን ለመከታተል ደህንነቱ የተጠበቀ ፣-ማዕከላዊ መድረክ።",
        category: "Operational",
        technologies: ["React", "Node.js", "PostgreSQL"],
        outcome: "Auditing time reduced by 60%.",
        imageUrl: "https://placehold.co/600x400/2c3e50/ffffff?text=Inventory+System"
    },
    {
        id: 2,
        title: "Military Court Management Portal",
        title_am: "የወታደራዊ ፍርድ ቤት አስተዳደር ፖርታል",
        description: "Digitized case scheduling and document management for the legal division.",
        description_am: "ለህግ ክፍል ዲጂታል የጉዳይ መርሃግብር እና የሰነድ አስተዳደር።",
        category: "Administrative",
        technologies: ["Angular", "Java Spring", "Encrypted DB"],
        outcome: "Eliminated paper backlog completely.",
        imageUrl: "https://placehold.co/600x400/2c3e50/ffffff?text=Court+System"
    }
];

const MOCK_NEWS = [
    {
        id: 101,
        title: "ICT Office Launches New Secure Gateway",
        title_am: "የአይሲቲ ቢሮ አዲስ ደህንነቱ የተጠበቀ መግቢያ ጀመረ",
        summary: "Enhanced border protocols now active for all internal networks.",
        summary_am: "የተሻሻሉ የድንበር ፕሮቶኮሎች አሁን ለሁሉም የውስጥ አውታረ መረቦች ንቁ ናቸው።",
        content: "The ICT Office is proud to announce the full deployment of our new Secure Gateway protocol.",
        content_am: "የአይሲቲ ቢሮ የአዲሱን ደህንነቱ የተጠበቀ መግቢያ ፕሮቶኮላችንን ሙሉ በሙሉ መዘርጋቱን በኩራት ያስታውቃል።",
        important: true,
        date: new Date('2025-10-15'),
        imageUrl: "https://placehold.co/800x400/27ae60/ffffff?text=Secure+Gateway"
    }
];

const MOCK_RESOURCES = [
    {
        id: 201,
        title: "Securing the Digital Supply Chain",
        title_am: "የዲጂታል አቅርቦት ሰንሰለትን ደህንነት መጠበቅ",
        type: "Whitepaper",
        summary: "Best practices for vetting third-party software vendors in defense contracts.",
        summary_am: "በመከላከያ ኮንትራቶች ውስጥ የሶስተኛ ወገን ሶፍትዌር አቅራቢዎችን ለመመርመር ምርጥ ልምዶች።",
        content: "Supply chain attacks are rising. This whitepaper outlines the new 'verify-then-trust' framework.",
        content_am: "የአቅርቦት ሰንሰለት ጥቃቶች እየጨመሩ ነው። ይህ ነጭ ወረቀት አዲሱን 'አረጋግጥ-ከዚያ-እመን' ማዕቀፍ ይዘረዝራል።",
        author: "CISO",
        tags: ["Security", "Policy"],
        date: new Date('2025-09-10'),
        imageUrl: "https://placehold.co/600x400/2980b9/ffffff?text=Supply+Chain"
    }
];

const MOCK_SERVICES = [
    {
        id: 301,
        title: "Network Security Audits",
        title_am: "የአውታረ መረብ ደህንነት ኦዲቶች",
        description: "Comprehensive vulnerability assessment for base infrastructure.",
        description_am: "ለመሠረተ ልማት አጠቃላይ ተጋላጭነት ግምገማ።",
        icon: "fa-shield-alt"
    }
];

const isDbConnected = () => mongoose.connection.readyState === 1;

// --- GENERIC CRUD HANDLER ---
// This simplifies creating uniform endpoints for all types
const createCrudEndpoints = (routePrefix, Model, mockData) => {
    // GET ALL with Filtering & Search
    router.get(routePrefix, async (req, res) => {
        try {
            const { category, type, search } = req.query;

            // Build Query
            let query = {};
            if (category && category !== 'All') query.category = category;
            if (type && type !== 'All') query.type = type;

            if (search) {
                const searchRegex = { $regex: search, $options: 'i' };
                query.$or = [
                    { title: searchRegex },
                    { description: searchRegex },
                    { summary: searchRegex },
                    { tags: searchRegex }
                ];
            }

            if (!isDbConnected()) {
                let data = [...mockData];
                if (category && category !== 'All') data = data.filter(i => i.category === category);
                if (type && type !== 'All') data = data.filter(i => i.type === type);
                if (search) {
                    const lc = search.toLowerCase();
                    data = data.filter(i =>
                        (i.title && i.title.toLowerCase().includes(lc)) ||
                        (i.description && i.description.toLowerCase().includes(lc)) ||
                        (i.summary && i.summary.toLowerCase().includes(lc)) ||
                        (i.tags && i.tags.some(t => t.toLowerCase().includes(lc)))
                    );
                }
                return res.json(data);
            }

            const items = await Model.find(query).sort({ createdAt: -1, date: -1 });
            res.json(items.length ? items : mockData);
        } catch (err) { res.status(500).json({ error: err.message }); }
    });

    // GET SINGLE (Hybrid Strategy: Try DB, then Mock)
    router.get(`${routePrefix}/:id`, async (req, res) => {
        try {
            const { id } = req.params;
            let item = null;

            // 1. Try DB if connected and ID is valid MongoDB ID
            if (isDbConnected() && mongoose.Types.ObjectId.isValid(id)) {
                // Increment views for News
                if (routePrefix === '/news') {
                    item = await Model.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });
                } else {
                    item = await Model.findById(id);
                }
            }

            // 2. If not found in DB (or invalid ID), try Mock Data
            if (!item) {
                // Mock IDs are numbers
                const mockIndex = mockData.findIndex(i => i.id == id || i._id == id);
                if (mockIndex !== -1) {
                    if (routePrefix === '/news') {
                        mockData[mockIndex].views = (mockData[mockIndex].views || 0) + 1;
                    }
                    item = mockData[mockIndex];
                }
            }

            if (item) {
                res.json(item);
            } else {
                res.status(404).json({ message: 'Not Found' });
            }
        } catch (err) {
            console.error(`Error fetching ${routePrefix}/${req.params.id}:`, err);
            const fallbackItem = mockData.find(i => i.id == req.params.id);
            fallbackItem ? res.json(fallbackItem) : res.status(500).json({ error: err.message });
        }
    });

    // ... (rest of CRUD) ...
    // CREATE
    router.post(routePrefix, authenticateToken, async (req, res) => {
        try {
            if (!isDbConnected()) {
                const newItem = { ...req.body, id: Date.now(), _id: Date.now().toString(), views: 0 };
                mockData.unshift(newItem);
                return res.status(201).json(newItem);
            }
            const newItem = await Model.create({ ...req.body, views: 0 });
            res.status(201).json(newItem);
        } catch (err) { res.status(500).json({ error: err.message }); }
    });
    // ... 
};

// ... CRUD INITS ...
createCrudEndpoints('/projects', Project, MOCK_PROJECTS);
createCrudEndpoints('/news', News, MOCK_NEWS);
createCrudEndpoints('/resources', Resource, MOCK_RESOURCES);
createCrudEndpoints('/services', Service, MOCK_SERVICES);

// --- STATS ENDPOINT ---
router.get('/stats', authenticateToken, async (req, res) => {
    try {
        let stats = {
            projects: MOCK_PROJECTS.length,
            news: MOCK_NEWS.length,
            resources: MOCK_RESOURCES.length,
            services: MOCK_SERVICES.length,
            totalViews: MOCK_NEWS.reduce((acc, curr) => acc + (curr.views || 0), 0),
            topNews: MOCK_NEWS.sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5)
        };

        if (isDbConnected()) {
            const [pCount, nCount, rCount, sCount, newsData] = await Promise.all([
                Project.countDocuments(),
                News.countDocuments(),
                Resource.countDocuments(),
                Service.countDocuments(),
                News.find().sort({ views: -1 }).limit(5)
            ]);

            // Calculate total views from DB
            const allNews = await News.find({}, 'views');
            const totalViews = allNews.reduce((acc, curr) => acc + (curr.views || 0), 0);

            stats = {
                projects: pCount,
                news: nCount,
                resources: rCount,
                services: sCount,
                totalViews,
                topNews: newsData
            };
        }

        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// --- SEED ENDPOINT ---
router.post('/seed', async (req, res) => {
    try {
        if (!isDbConnected()) return res.json({ message: "DB not connected, using mock data" });

        await Project.deleteMany({});
        await News.deleteMany({});
        await Resource.deleteMany({});
        await Service.deleteMany({});

        // Add some basic seed data if needed here

        res.json({ message: "Database Cleared & Ready" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
