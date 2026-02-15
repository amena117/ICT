const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    title_am: { type: String },
    type: { type: String, enum: ['Article', 'Tutorial', 'Whitepaper'], default: 'Article' },
    summary: { type: String, required: true },
    summary_am: { type: String },
    content: { type: String, required: true },
    content_am: { type: String },
    author: { type: String, default: 'ICT Office' },
    imageUrl: { type: String },
    tags: [String],
    date: { type: Date, default: Date.now },
    views: { type: Number, default: 0 }
});

module.exports = mongoose.model('Resource', ResourceSchema);
