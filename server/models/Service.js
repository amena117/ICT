const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    title_am: { type: String, required: true },
    description: { type: String, required: true },
    description_am: { type: String, required: true },
    icon: { type: String, default: 'fa-cogs' }, // FontAwesome class or similar
    category: { type: String, default: 'General' }
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
