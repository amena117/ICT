const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    title_am: { type: String },
    summary: { type: String, required: true },
    summary_am: { type: String },
    content: String,
    content_am: String,
    date: { type: Date, default: Date.now },
    category: { type: String, default: 'General' },
    imageUrl: { type: String },
    views: { type: Number, default: 0 },
    important: { type: Boolean, default: false } // For pins/alerts
}, { timestamps: true });

module.exports = mongoose.model('News', NewsSchema);
