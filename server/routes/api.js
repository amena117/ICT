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
    },
    {
        id: 3,
        title: "Secure Commsat Uplink",
        title_am: "ደህንነቱ የተጠበቀ የግንኙነት ሳተላይት",
        description: "Encrypted satellite uplink for field operations.",
        description_am: "ለሜዳ ስራዎች የተመሰጠረ የሳተላይት ግንኙነት።",
        category: "Infrastructure",
        technologies: ["C++", "Python", "RF"],
        outcome: "99.9% uptime during drills.",
        imageUrl: "https://placehold.co/600x400/2c3e50/ffffff?text=Commsat"
    },
    {
        id: 4,
        title: "Recruitment Portal 2.0",
        title_am: "የምልመላ ፖርታል 2.0",
        description: "Streamlined application process for new cadets.",
        description_am: "ለአዳዲስ እጩዎች የተሳለጠ የማመልከቻ ሂደት።",
        category: "Administrative",
        technologies: ["Vue.js", "Laravel"],
        outcome: "Doubled application throughput.",
        imageUrl: "https://placehold.co/600x400/2c3e50/ffffff?text=Recruitment"
    },
    {
        id: 5,
        title: "Drone Fleet Analytics",
        title_am: "ሰው አልባ አውሮፕላን ትንታኔ",
        description: "Real-time telemetry analysis for UAV fleet.",
        description_am: "ለሰው አልባ አውሮፕላኖች እውነተኛ ጊዜ ቴሌሜትሪ ትንታኔ።",
        category: "Operational",
        technologies: ["Python", "TensorFlow"],
        outcome: "Predictive maintenance accuracy up 40%.",
        imageUrl: "https://placehold.co/600x400/2c3e50/ffffff?text=Drone+Analytics"
    },
    {
        id: 6,
        title: "Cyber Range Simulation",
        title_am: "የሳይበር ክልል ማስመሰል",
        description: "Training environment for cyber defense units.",
        description_am: "ለሳይበር መከላከያ ክፍሎች የስልጠና አካባቢ።",
        category: "Training",
        technologies: ["Docker", "Kubernetes"],
        outcome: "Trained 500+ specialists.",
        imageUrl: "https://placehold.co/600x400/2c3e50/ffffff?text=Cyber+Range"
    },
    {
        id: 7,
        title: "Base Access Control",
        title_am: "የመሠረት መዳረሻ ቁጥጥር",
        description: "Biometric entry system for sensitive areas.",
        description_am: "ለስሱ አካባቢዎች ባዮሜትሪክ መግቢያ ስርዓት።",
        category: "Infrastructure",
        technologies: ["IoT", "Go"],
        outcome: "Zero unauthorized entries.",
        imageUrl: "https://placehold.co/600x400/2c3e50/ffffff?text=Access+Control"
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
    },
    {
        id: 102,
        title: "Cybersecurity Awareness Month Kicks Off",
        title_am: "የሳይበር ደህንነት ግንዛቤ ወር ተጀመረ",
        summary: "Join us for workshops and seminars throughout October.",
        summary_am: "በጥቅምት ወር በሙሉ ለአውደ ጥናቶች እና ሴሚናሮች ይቀላቀሉ።",
        content: "October is Cybersecurity Awareness Month. We are hosting a series of events.",
        content_am: "ጥቅምት የሳይበር ደህንነት ግንዛቤ ወር ነው። ተከታታይ ዝግጅቶችን እያዘጋጀን ነው።",
        important: false,
        date: new Date('2025-10-01'),
        imageUrl: "https://placehold.co/800x400/27ae60/ffffff?text=Awareness"
    },
    {
        id: 103,
        title: "System Maintenance Scheduled",
        title_am: "የስርዓት ጥገና ተይዟል",
        summary: "Downtime expected this weekend for server upgrades.",
        summary_am: "ለአገልጋይ ማሻሻያዎች በዚህ ሳምንት መጨረሻ የእረፍት ጊዜ ይጠበቃል።",
        content: "Please be advised that critical systems will be offline from Saturday 2200 to Sunday 0600.",
        content_am: "እባክዎን ወሳኝ ስርዓቶች ከቅዳሜ 2200 እስከ እሁድ 0600 ከመስመር ውጭ እንደሚሆኑ ይወቁ።",
        important: true,
        date: new Date('2025-09-28'),
        imageUrl: "https://placehold.co/800x400/c0392b/ffffff?text=Maintenance"
    },
    {
        id: 104,
        title: "New AI Research Initiative",
        title_am: "አዲስ የኤአይ ምርምር ተነሳሽነት",
        summary: "Partnering with universities for defense AI research.",
        summary_am: "ከዩኒቨርሲቲዎች ጋር ለመከላከያ ኤአይ ምርምር አጋርነት።",
        content: "We are excited to announce a new grant program for AI research in defense applications.",
        content_am: "በመከላከያ መተግበሪያዎች ውስጥ ለኤአይ ምርምር አዲስ የእርዳታ ፕሮግራም በማስታወቅ ደስተኞች ነን።",
        important: false,
        date: new Date('2025-09-20'),
        imageUrl: "https://placehold.co/800x400/27ae60/ffffff?text=AI+Research"
    },
    {
        id: 105,
        title: "Staff Promotion Ceremony",
        title_am: "የሰራተኞች እድገት ሥነ ሥርዓት",
        summary: "Celebrating the achievements of our technical staff.",
        summary_am: "የቴክኒክ ሰራተኞቻችንን ስኬቶች በማክበር ላይ።",
        content: "Congratulations to all the newly promoted officers and civilian staff.",
        content_am: "ለአዳዲስ እድገት ላገኙ መኮንኖች እና ሲቪል ሰራተኞች በሙሉ እንኳን ደስ አላችሁ።",
        important: false,
        date: new Date('2025-09-15'),
        imageUrl: "https://placehold.co/800x400/27ae60/ffffff?text=Promotions"
    },
    {
        id: 106,
        title: "Cloud Migration Complete",
        title_am: "የደመና ሽግግር ተጠናቀቀ",
        summary: "All non-sensitive workloads moved to private cloud.",
        summary_am: "ሁሉም ጥንቃቄ የሌላቸው የስራ ጫናዎች ወደ የግል ደመና ተወስደዋል።",
        content: "The multi-year cloud migration project has officially concluded ahead of schedule.",
        content_am: "የብዝሃ-ዓመት የደመና ሽግግር ፕሮጀክት ከመርሃግብሩ በፊት በይፋ ተጠናቅቋል።",
        important: false,
        date: new Date('2025-09-01'),
        imageUrl: "https://placehold.co/800x400/27ae60/ffffff?text=Cloud"
    },
    {
        id: 107,
        title: "Vendor Tech Expo 2025",
        title_am: "አቅራቢ ቴክ ኤክስፖ 2025",
        summary: "Upcoming exhibition of latest defense technologies.",
        summary_am: "መጪው የመከላከያ ቴክኖሎጂዎች ኤግዚቢሽን።",
        content: "Registration is now open for the annual Vendor Tech Expo.",
        content_am: "ለዓመታዊው የአቅራቢ ቴክ ኤክስፖ ምዝገባ አሁን ክፍት ነው።",
        important: false,
        date: new Date('2025-08-25'),
        imageUrl: "https://placehold.co/800x400/27ae60/ffffff?text=Tech+Expo"
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
    },
    {
        id: 202,
        title: "React Style Guide",
        title_am: "የ React ዘይቤ መመሪያ",
        type: "Article",
        summary: "Internal standards for frontend development.",
        summary_am: "ለፊት ለፊት ልማት የውስጥ ደረጃዎች።",
        content: "Consistent code style is key. Follow these guidelines for all new React projects.",
        content_am: "ወጥ የሆነ የኮድ ዘይቤ ቁልፍ ነው። ለሁሉም አዳዲስ የ React ፕሮጀክቶች እነዚህን መመሪያዎች ይከተሉ።",
        author: "Lead Dev",
        tags: ["Development", "React"],
        date: new Date('2025-08-15'),
        imageUrl: "https://placehold.co/600x400/2980b9/ffffff?text=Style+Guide"
    },
    {
        id: 203,
        title: "Intro to Kubernetes",
        title_am: "የ Kubernetes መግቢያ",
        type: "Tutorial",
        summary: "Getting started with container orchestration.",
        summary_am: "በመያዣ ኦርኬስትራ መጀመር።",
        content: "Learn the basics of Pods, Services, and Deployments in this hands-on lab.",
        content_am: "በዚህ በተግባራዊ ላብራቶሪ ውስጥ ስለ Pods ፣ Services እና Deployments መሰረታዊ ነገሮችን ይወቁ።",
        author: "DevOps Team",
        tags: ["DevOps", "Kubernetes"],
        date: new Date('2025-08-01'),
        imageUrl: "https://placehold.co/600x400/2980b9/ffffff?text=K8s+101"
    },
    {
        id: 204,
        title: "Zero Trust Architecture",
        title_am: "ዜሮ እምነት አርክቴክቸር",
        type: "Whitepaper",
        summary: "Moving beyond perimeter defense.",
        summary_am: "ከወሰን መከላከያ ባሻገር መንቀሳቀስ።",
        content: "Why the castle-and-moat security model is obsolete.",
        content_am: "ለምን የቤተመንግስት-እና-ሞት የደህንነት ሞዴል ጊዜ ያለፈበት ነው።",
        author: "Architecture Board",
        tags: ["Security", "Architecture"],
        date: new Date('2025-07-20'),
        imageUrl: "https://placehold.co/600x400/2980b9/ffffff?text=Zero+Trust"
    },
    {
        id: 205,
        title: "Git Workflow Standards",
        title_am: "የ Git የስራ ፍሰት ደረጃዎች",
        type: "Article",
        summary: "Branching strategies and commit message conventions.",
        summary_am: "የቅርንጫፍ ስልቶች እና የገቡ መልእክት ስምምነቶች።",
        content: "We use trunk-based development with short-lived feature branches.",
        content_am: "እኛ በአጭር ጊዜ የመተግበሪያ ቅርንጫፎች አማካኝነት በግንድ ላይ የተመሠረተ ልማት እንጠቀማለን።",
        author: "Tech Lead",
        tags: ["Development", "Git"],
        date: new Date('2025-07-10'),
        imageUrl: "https://placehold.co/600x400/2980b9/ffffff?text=Git+Workflow"
    },
    {
        id: 206,
        title: "Secure Coding Practices",
        title_am: "ደህንነቱ የተጠበቀ የኮድ አሰራሮች",
        type: "Tutorial",
        summary: "OWASP Top 10 mitigation strategies.",
        summary_am: "የ OWASP ምርጥ 10 የመቀነስ ስልቶች።",
        content: "How to prevent SQL injection, XSS, and other common vulnerabilities.",
        content_am: "የ SQL መርፌን ፣ XSS ን እና ሌሎች የተለመዱ ተጋላጭነቶችን እንዴት መከላከል እንደሚቻል።",
        author: "Security Team",
        tags: ["Security", "Development"],
        date: new Date('2025-06-25'),
        imageUrl: "https://placehold.co/600x400/2980b9/ffffff?text=Secure+Code"
    },
    {
        id: 207,
        title: "Legacy System Decommissioning",
        title_am: "የድሮ ስርዓት ማሰናበት",
        type: "Whitepaper",
        summary: "Roadmap for retiring the mainframe.",
        summary_am: "ዋናውን ፍሬም ጡረታ ለማውጣት የመንገድ ካርታ።",
        content: "Steps to safely migrate off the legacy mainframe by 2026.",
        content_am: "በ 2026 ከድሮው ዋና ፍሬም በደህና ለመሰደድ ደረጃዎች።",
        author: "CIO",
        tags: ["Strategy", "Legacy"],
        date: new Date('2025-06-01'),
        imageUrl: "https://placehold.co/600x400/2980b9/ffffff?text=Legacy+End"
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
    // GET ALL with Filtering, Search & Pagination
    router.get(routePrefix, async (req, res) => {
        try {
            const { category, type, search, page = 1, limit = 6 } = req.query;
            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);

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

            // Determine if we should use DB or Mock
            let useDb = isDbConnected();
            if (useDb) {
                const dbGlobalCount = await Model.countDocuments({});
                if (dbGlobalCount === 0) { useDb = false; }
            }

            if (!useDb) {
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

                // Pagination for Mock Data
                const totalItems = data.length;
                const totalPages = Math.ceil(totalItems / limitNum);
                const startIndex = (pageNum - 1) * limitNum;
                const paginatedData = data.slice(startIndex, startIndex + limitNum);

                return res.json({
                    data: paginatedData,
                    pagination: {
                        currentPage: pageNum,
                        totalPages: totalPages,
                        totalItems: totalItems,
                        hasNextPage: pageNum < totalPages,
                        hasPrevPage: pageNum > 1
                    }
                });
            }

            // Pagination for DB
            const totalItems = await Model.countDocuments(query);
            const totalPages = Math.ceil(totalItems / limitNum);
            const items = await Model.find(query)
                .sort({ createdAt: -1, date: -1 })
                .skip((pageNum - 1) * limitNum)
                .limit(limitNum);

            // Fallback to mock data if DB empty (optional, but per original logic)
            if (items.length === 0 && totalItems === 0 && !search && (!category || category === 'All') && (!type || type === 'All')) {
                // Even if DB is connected but empty, returns mock data? 
                // The original logic was: res.json(items.length ? items : mockData);
                // We should replicate that behavior but paginated.
                // It gets complicated mixing them. Let's assume if DB is connected, we use DB.
                // If the user wants to see data, they should seed it using the seed endpoint.
            }

            res.json({
                data: items.length > 0 ? items : (totalItems === 0 && !search ? [] : []), // If no items found in DB...
                pagination: {
                    currentPage: pageNum,
                    totalPages: totalPages,
                    totalItems: totalItems,
                    hasNextPage: pageNum < totalPages,
                    hasPrevPage: pageNum > 1
                }
            });

        } catch (err) { res.status(500).json({ error: err.message }); }
    });

    // GET SINGLE (Hybrid Strategy: Try DB, then Mock)
    // Note: This logic remains largely same, just extracted for clarity
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
