const mongoose = require('mongoose');
const Service = require('./models/Service');
require('dotenv').config();

const services = [
    {
        title: "Web System Development",
        title_am: "የድር ስርዓት ልማት",
        description: "Custom secure web applications tailored to defense needs.",
        description_am: "ለባዲ መከላከያ ፍላጎቶች የተዘጋጀ የድር መተግበሪያ።",
        icon: "fa-code"
    },
    {
        title: "IT Infrastructure",
        title_am: "የአይቲ መሰረተ ልማት",
        description: "Robust networking and server management.",
        description_am: "ጠንካራ አውታረ መረብ እና አገልጋይ አያያዝ።",
        icon: "fa-server"
    },
    {
        title: "Cybersecurity",
        title_am: "ሳይበር ደህንነት",
        description: "Vulnerability assessments and secure coding audits.",
        description_am: "የተጋላጭነት ግምገማዎች እና ደህንነቱ የተጠበቀ የኮድ ኦዲት።",
        icon: "fa-shield-alt"
    },
    {
        title: "Digital Training",
        title_am: "ዲጂታል ስልጠና",
        description: "Upskilling personnel in modern digital tools.",
        description_am: "በዘመናዊ ዲጂታል መሳሪያዎች ውስጥ የሰው ኃይል ማሳደግ።",
        icon: "fa-chalkboard-teacher"
    },
    {
        title: "Software Development",
        title_am: "ሶፍትዌር ልማት",
        description: "End-to-end software solutions for various operational needs.",
        description_am: "ለተለያዩ የአሰራር ፍላጎቶች የመጨረሻ-እስከ-መጨረሻ የሶፍትዌር መፍትሄዎች።",
        icon: "fa-laptop-code"
    },
    {
        title: "Database Administration",
        title_am: "የመረጃ ቋት አስተዳደር",
        description: "Secure and efficient database management and optimization.",
        description_am: "ደህንነቱ የተጠበቀ እና ቀልጣፋ የመረጃ ቋት አያያዝ እና ማመቻቸት።",
        icon: "fa-database"
    },
    {
        title: "Organization System Development Department",
        title_am: "የአደራጃት ሲስተም ልማት መምሪያ",
        description: "Includes System Enhancement Group, Human Resource Study and Diagnostics Group.",
        description_am: "የሲስተም ማበልጸጊያ ቡድን፣ የሰው ኃይል ጥናት እና ዲያግኖስቲክስ ቡድን።",
        icon: "fa-sitemap"
    },
    {
        title: "Data Center Service Administration Department",
        title_am: "የዳታ ማዕከል አገልግሎት አስተዳደር መምሪያ",
        description: "Includes Network Operations Group, Database and Web Administration Group, Organization Security Administration Group.",
        description_am: "የኔትወርክ ኦፕሬሽን ቡድን፣ የዳታ ቤዝ እና ዌብ አስተዳደር ቡድን፣ የአደራጃት ደህንነት አስተዳደር ቡድን።",
        icon: "fa-server"
    },
    {
        title: "Infrastructure Preparation and Study Department",
        title_am: "የአደራጃት የመሰረተ ልማት ዝግጅትና ማጥናት መምሪያ",
        description: "Includes Network Installation and Study Group, Organization Technical Maintenance Group.",
        description_am: "የኔትወርክ ዝርጋታ እና ማጥናት ቡድን፣ የአደራጃት የቴክኒክ ጥገና ቡድን።",
        icon: "fa-network-wired"
    }
];

const seedDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://amenbefekadu2009_db_user:B3DioogbDrFlcCkq@cluster0.oiijgpm.mongodb.net/?appName=Cluster0';
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing services
        await Service.deleteMany({});
        console.log('Cleared existing services');

        // Insert new services
        await Service.insertMany(services);
        console.log('Inserted services');

        mongoose.connection.close();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
