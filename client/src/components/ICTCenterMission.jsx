import React from 'react';
import { motion } from 'framer-motion';

const ICTCenterMission = () => {
    return (
        <section className="section bg-gray-50/50 relative py-16 md:py-24" dir="rtl">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1100px] relative z-10">
                {/* Main Heading */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#006600] font-sans">
                        አይሲቲ ማእከል
                    </h2>
                    <div className="w-24 h-1 bg-[#006600]/80 mx-auto mt-6 rounded-full" />
                </motion.div>

                {/* Two Column Layout */}
                <div className="flex flex-row flex-wrap sm:flex-nowrap gap-6 md:gap-8 justify-center items-stretch">

                    {/* Left Column (Goal) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full sm:w-1/2 flex-1 bg-white rounded-[10px] p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,102,0,0.1)] border border-gray-100 hover:shadow-[0_8px_30px_-4px_rgba(0,102,0,0.15)] transition-shadow duration-300"
                    >
                        <div className="flex flex-col h-full bg-gradient-to-br from-white to-[#f8fdf8] rounded-lg">
                            <h3 className="text-2xl md:text-3xl font-bold text-[#006600] mb-4 font-sans border-b border-[#006600]/10 pb-3">
                                ግብ
                            </h3>
                            <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-sans text-justify mt-2">
                                የአይሲቲ ማእከላችን ግብ የቴክኖሎጂ ትምህርትን ማስፋፋት፣ ዲጂታል ክህሎትን ማሳደግና ለሀገር የልማት አስተዋጽኦ ማድረግ ነው።
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Column (Mission) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="w-full sm:w-1/2 flex-1 bg-white rounded-[10px] p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,102,0,0.1)] border border-gray-100 hover:shadow-[0_8px_30px_-4px_rgba(0,102,0,0.15)] transition-shadow duration-300"
                    >
                        <div className="flex flex-col h-full bg-gradient-to-bl from-white to-[#f8fdf8] rounded-lg">
                            <h3 className="text-2xl md:text-3xl font-bold text-[#006600] mb-4 font-sans border-b border-[#006600]/10 pb-3">
                                ተልዕኮ
                            </h3>
                            <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-sans text-justify mt-2">
                                ተልዕኳችን በዘመናዊ አይሲቲ መሣሪያዎች የታጠቁ ወጣቶችን ማሰልጠን፣ ፈጠራን መደገፍና ዲጂታል ኢኮኖሚውን ማጠንከር ነው።
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default ICTCenterMission;
