const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userModel', 
    required: true
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'jobModel', 
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  applicationDate: {
    type: Date,
    default: Date.now
  },
  submissionDate: {
    type: Date,
    default: Date.now
  },
  lastModified: {
    type: Date,
    default: Date.now
  },
  coverLetter: String,
  resumeUrl: String,
  interviewDate: Date,
  feedback: String
});

const applicationModel = mongoose.model('Application', applicationSchema);

module.exports = {applicationModel};
