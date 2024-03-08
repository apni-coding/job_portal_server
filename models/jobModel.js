const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    skills: [
       
    ],
    type: {
        type: String,
        enum: ['full', 'part', 'contract'],
        required: true
    },
    duration: {
        type: String,
        default: 'flexible'
    },
    salary: {
        type: Number,
        required: true
    },
    applicationDeadline: {
        type: Date,
        required: true
    },
    numberOfOpenings: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    experienceLevel: {
        type: String,
        required: true
    },
    educationRequirements: {
        type: String,
        required: true
    },
    benefits: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    isOpening: {
        type: String,
        default: true
    },
    jobOwnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required: true
    }
}, { timestamps: true });

const jobModel = mongoose.model('Job', jobSchema);

module.exports = { jobModel };
