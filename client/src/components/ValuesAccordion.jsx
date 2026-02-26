import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const valuesData = [
    {
        id: 1,
        title: 'ከራስ በፊት ለሀገርና ለህዝብ',
        content: [
            'ለህገ-መንግስቱ ታማኝ መሆን፣ ለሀገርና ለህዝብ ህይወትን መስጠት',
            'በሠራዊቱና በሰርዓቱ እምነት መፍጠር፣ ጀግንነትን፣ ቁርጠኝነትን',
            'ቀደምትነትን፣ ለሙያ ፍቅርና ክብርን መስጠት፣ ህግና ደንብን መከተል',
            'ከራሱ በፊት ጓዱን ወይም የሚመራውን ሰው ማክበርና ማሰብ',
            'ስነ-ስርዓት ማክበርና ራስን መግዛት'
        ]
    },
    {
        id: 2,
        title: 'ምንጊዜም የተሟላ ሰብዕና',
        content: [
            'የሞራል ጥንካሬን፣ ከሙስና የፀዳና ሙሰናን የማይሸከም መሆን',
            'የተስተካከለ ስነ-ምገባር መላበስ፣ ታማኝ መሆን',
            'ኃላፊነት የሚሰማው፣ የባቤትነት ስሜት ያለው፣ ግልጽነትና ተጠያቂነት',
            'የራስንም ሆነ የሌላውን ክብር የማያንቋሽሽ፣ ሚስጥር መጠበቅ'
        ]
    },
    {
        id: 3,
        title: 'ያልተሸራረፈ ዲሞክራቲክ አስተሳሰብ',
        content: [
            'በህዝብ ማመን፣ የሰውን መብት ማክበር፣ በቡድን መስራት',
            'መግባባትና መደጋገፍ፣ አሳታፊነት፣ የብሔር/ብሄረሰቦች መብት ማክበር',
            'የጾታና በሀይማኖት እኩልነት ማመን፣ በዲሞክራሲ የተመረጡ የህዝብ ወኪሎችን ማክበር',
            'ለብዙሃን ሃሳብ ተገዥ መሆን፣ ሃሳብን በግልጽ ማንሸራሽር፣ ዲሞክራሲያዊ ዝምድና'
        ]
    },
    {
        id: 4,
        title: 'በማንኛውም ግዳጅ/ሁሉም ሁኔታ የላቀ ውጤት',
        content: [
            'ቆጣቢነት፣ ሳይንሳዊ አመለካከት፣ ከፍተኛ የሥራ ተነሳሽነት',
            'የፈጠራ ችሎታ፣ በጥራት ግልጋሎት መስጠት፣ የራስን ችሎታ ማሳደግ',
            'ግዳጅን በጥራት መወጣት፣ አርቆ ማሰብ፣ አርአያነት',
            'በቡድን መስራት፣ ቀደምትነት፣ ተጣጣፊነት፣ ወትሮ ዝግጅነት'
        ]
    }
];

const ValuesAccordion = () => {
    const [openId, setOpenId] = useState(null);

    const toggleAccordion = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className="section bg-white relative py-16 md:py-24">
            {/* Decorative subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #006A4E 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2
                        className="text-3xl md:text-5xl font-bold mb-4 text-ethiopian-green tracking-tight"
                    >
                        የኢፌዴሪ መከላከያ ሰራዊት ቁልፍ እሴቶች
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-ethiopian-gold to-transparent mx-auto mt-6"></div>
                </motion.div>

                <motion.div
                    className="space-y-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.15 }
                        }
                    }}
                >
                    {valuesData.map((item) => {
                        const isOpen = openId === item.id;

                        return (
                            <motion.div
                                key={item.id}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                                }}
                                className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-white border border-gray-100/50"
                            >
                                <button
                                    onClick={() => toggleAccordion(item.id)}
                                    className={`w-full flex items-center justify-between p-5 md:p-6 transition-all duration-300 ${isOpen
                                            ? 'bg-ethiopian-green text-white'
                                            : 'bg-ethiopian-green/95 text-white hover:bg-ethiopian-green'
                                        }`}
                                    aria-expanded={isOpen}
                                >
                                    <div className="flex items-center gap-4 text-left">
                                        <span className="text-xl md:text-2xl font-bold opacity-90 drop-shadow-sm">{item.id}.</span>
                                        <span className="text-lg md:text-xl font-medium tracking-wide drop-shadow-sm">
                                            {item.title}
                                        </span>
                                    </div>
                                    <div className="flex-shrink-0 ml-4">
                                        <motion.div
                                            animate={{ rotate: isOpen ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/20 shadow-sm"
                                        >
                                            <span className="text-2xl font-light leading-none mt-[-2px]">
                                                {isOpen ? '−' : '+'}
                                            </span>
                                        </motion.div>
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            <div className="p-6 md:p-8 bg-gradient-to-b from-gray-50 to-white border-t border-gray-100">
                                                <ul className="space-y-4 text-gray-700 md:text-lg">
                                                    {item.content.map((listItem, i) => (
                                                        <motion.li
                                                            key={i}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ duration: 0.3, delay: i * 0.05 + 0.1 }}
                                                            className="leading-relaxed flex items-start gap-3"
                                                        >
                                                            <span className="text-ethiopian-green mt-1.5 flex-shrink-0">
                                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                                                </svg>
                                                            </span>
                                                            <span>{listItem}</span>
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default ValuesAccordion;
