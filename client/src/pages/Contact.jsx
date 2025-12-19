import React from 'react';

const Contact = () => {
    return (
        <div className="container section">
            <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '8px' }}>
                <h1>Contact Us</h1>
                <p style={{ marginBottom: '1.5rem' }}>Secure communication channel.</p>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
                        <input type="text" style={{ width: '100%', padding: '0.5rem' }} placeholder="Your Name" />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                        <input type="email" style={{ width: '100%', padding: '0.5rem' }} placeholder="official@domain.gov" />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Message</label>
                        <textarea rows="5" style={{ width: '100%', padding: '0.5rem' }} placeholder="Enter your inquiry..."></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Send Secure Message</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
