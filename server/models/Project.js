const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, enum: ['Administrative', 'Operational', 'Infrastructure', 'Training'] },
    technologies: [String],
    imageUrl: { type: String, default: '/assets/placeholder-project.jpg' },
    status: { type: String, default: 'Completed' },
    outcome: String
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
