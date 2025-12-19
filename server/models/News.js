const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: String,
    date: { type: Date, default: Date.now },
    category: { type: String, default: 'General' },
    important: { type: Boolean, default: false } // For pins/alerts
}, { timestamps: true });

module.exports = mongoose.model('News', NewsSchema);
