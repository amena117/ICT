import React from 'react';

const About = () => {
    const officials = [
        {
            name: "Gen. Arthur Sterling",
            role: "Chief Information Officer",
            bio: "Leading the ministry's digital transformation with over 30 years of strategic defense experience.",
            imageUrl: "https://placehold.co/150x150/2c3e50/ffffff?text=CIO"
        },
        {
            name: "Sarah Jenkins",
            role: "Deputy Director of Cybersecurity",
            bio: "Expert in threat intelligence and network hardening, ensuring our infrastructure remains impenetrable.",
            imageUrl: "https://placehold.co/150x150/e74c3c/ffffff?text=Sec+Dir"
        },
        {
            name: "Col. James Vance",
            role: "Head of Infrastructure",
            bio: "Overseeing the deployment of resilient cloud nodes and tactical battlefield communications.",
            imageUrl: "https://placehold.co/150x150/2980b9/ffffff?text=Infra+Head"
        }
    ];

    return (
        <div className="container section">
            <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>About the ICT Office</h1>

            {/* Goal Section */}
            <section style={{ marginBottom: '3rem', backgroundColor: '#f8f9fa', padding: '3rem 2rem', borderRadius: '8px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#2C3E50' }}>
                    አላማ (Goal)
                </h2>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <p style={{ fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '1rem', fontWeight: '500', textAlign: 'center' }}>
                        በኢንፎርሜሽን ኮምዩኒኬሽን ቴክኖሎጂ ኢናቪሽን ላይ የተመሰረቱ የአስራር ስርዓቶች ያሉት ዲጂታል መከላከያን ማየት።
                    </p>
                    <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#555', fontStyle: 'italic', textAlign: 'center' }}>
                        To establish digital protection systems based on Information and Communication Technology (ICT) innovation.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section style={{ marginBottom: '3rem', backgroundColor: '#fff', padding: '3rem 2rem', borderRadius: '8px', border: '1px solid #eee' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#2C3E50' }}>
                    ተልዕኮ (Mission)
                </h2>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <p style={{ fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '1rem', fontWeight: '500', textAlign: 'center' }}>
                        የኢንፎርሜሽን ኮምዩኒኬሽን ቴክኖሎጂን በማለማትና በማስፋፋት ውጤታማ የኃብት አስተዳደር፣ ደህንነቱ የጠበቀ የኢንፎርሜሽን ፍሰትና ቀልጣፋ የአይሲቲ አገልግሎት በሚረጋገጥ ተቋሙ ተልዕኮውን በብቃት እንዲወጣ መደገፍ።
                    </p>
                    <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#555', fontStyle: 'italic', textAlign: 'center' }}>
                        To support the institution's mission by developing and expanding ICT for efficient resource management, secure information flow, and reliable, fast IT services.
                    </p>
                </div>
            </section>

            {/* Main Activities Section */}
            <section style={{ marginBottom: '4rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '3rem', color: '#2C3E50', borderBottom: '3px solid #3498DB', paddingBottom: '1rem' }}>
                    ዋና ዋና ተግባራት (Main Activities)
                </h2>

                <div style={{ display: 'grid', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
                    {/* Activity 3.1 */}
                    <div style={{ backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '8px', borderLeft: '4px solid #3498DB' }}>
                        <h3 style={{ color: '#2C3E50', marginBottom: '1rem', fontSize: '1.1rem' }}>3.1</h3>
                        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '0.8rem', fontWeight: '500' }}>
                            የተቋሙን የኢንፎርሜሽን ኮምዩኒኬሽን ቴክኖሎጂ ሲስተም ማጥናት፣ ማልማት፣ ማለመድና ዲጆታላይዝድ ያደርጋል።
                        </p>
                        <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#555', fontStyle: 'italic' }}>
                            To study, develop, upgrade, and digitize the organization's information and communication technology systems.
                        </p>
                    </div>

                    {/* Activity 3.2 */}
                    <div style={{ backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '8px', borderLeft: '4px solid #27AE60' }}>
                        <h3 style={{ color: '#2C3E50', marginBottom: '1rem', fontSize: '1.1rem' }}>3.2</h3>
                        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '0.8rem', fontWeight: '500' }}>
                            የተቋሙን ኢንፎርሜሽን ኮምዩኒኬሽን ቴክኖሎጂ መሰረተ ልማትና አገልግሎት ማስፋፋት፣ ሲስተሞችን ዳታ ማዕከሎችና ንዑስ ዳታ ማዕከሎችን ያስተዳደሩል።
                        </p>
                        <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#555', fontStyle: 'italic' }}>
                            To expand ICT infrastructure and services, and to manage data centers and sub-data centers of the organization.
                        </p>
                    </div>

                    {/* Activity 3.3 */}
                    <div style={{ backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '8px', borderLeft: '4px solid #E67E22' }}>
                        <h3 style={{ color: '#2C3E50', marginBottom: '1rem', fontSize: '1.1rem' }}>3.3</h3>
                        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '0.8rem', fontWeight: '500' }}>
                            የተቋሙ አስራሮች በኢንፎርሜሽን ኮምዩኒኬሽን ቴክኖሎጂ እንዲደገፉ በማድረግ ውጤታማ የኃብት አስተዳደር ስርዓት ይዘረጋል።
                        </p>
                        <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#555', fontStyle: 'italic' }}>
                            To strengthen the organization's operations through ICT support and expand effective resource management systems.
                        </p>
                    </div>

                    {/* Activity 3.4 */}
                    <div style={{ backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '8px', borderLeft: '4px solid #E74C3C' }}>
                        <h3 style={{ color: '#2C3E50', marginBottom: '1rem', fontSize: '1.1rem' }}>3.4</h3>
                        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '0.8rem', fontWeight: '500' }}>
                            የተቋሙን የአይሲቲ መሰረተ ልማትና አገልግሎቶች ደህንነት ይጠብቃል፣ የአይሲቲ ንብረቶች እና ሶፍትዌሮች ይጠግናል፤ መልሶ የማግኘት (Backup & Recovery) ተግባራትን ያከናውናል።
                        </p>
                        <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#555', fontStyle: 'italic' }}>
                            To ensure the security of the organization's ICT infrastructure and services, maintain ICT assets and software, and execute backup and recovery operations.
                        </p>
                    </div>

                    {/* Activity 3.5 */}
                    <div style={{ backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '8px', borderLeft: '4px solid #9B59B6' }}>
                        <h3 style={{ color: '#2C3E50', marginBottom: '1rem', fontSize: '1.1rem' }}>3.5</h3>
                        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '0.8rem', fontWeight: '500' }}>
                            በኢንፎርሜሽን ቴክኖሎጂ ዘርፍ የአቅም ግንባታ ስራዎች ያከናውናል፤ ከሌሎች አገራዊ ተቋማት ጋር በትብብር ይሰራል።
                        </p>
                        <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#555', fontStyle: 'italic' }}>
                            To implement capacity-building programs in the field of information technology and collaborate with other national institutions.
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <h2 style={{ textAlign: 'center', marginBottom: '3rem', borderBottom: '2px solid #eee', paddingBottom: '1rem' }}>Leadership & Higher Officials</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
                    {officials.map((person, idx) => (
                        <div key={idx} style={{ textAlign: 'center' }}>
                            <img
                                src={person.imageUrl}
                                alt={person.name}
                                style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1.5rem', border: '4px solid #fff', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                            />
                            <h3 style={{ margin: '0.5rem 0', color: '#2C3E50' }}>{person.name}</h3>
                            <h4 style={{ margin: '0 0 1rem 0', color: '#7f8c8d', fontSize: '1rem', fontWeight: 'normal' }}>{person.role}</h4>
                            <p style={{ fontSize: '0.95rem', color: '#555' }}>{person.bio}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;
