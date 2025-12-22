const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    title_am: { type: String },
    description: { type: String, required: true },
    description_am: { type: String },
    category: { type: String, required: true, enum: ['Administrative', 'Operational', 'Infrastructure', 'Training'] },
    technologies: [String],
    imageUrl: { type: String, default: '/assets/placeholder-project.jpg' },
    status: { type: String, default: 'Completed' },
    outcome: String,
    outcome_am: String,
    views: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
