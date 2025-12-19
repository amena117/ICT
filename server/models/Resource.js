const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['Article', 'Tutorial', 'Whitepaper'], default: 'Article' },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, default: 'ICT Office' },
    imageUrl: { type: String },
    tags: [String],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resource', ResourceSchema);
