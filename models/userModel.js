const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    email: {
        type: String,
        required: true
    },
    skills:{
        type: [String],
        required: true
    }, 
    type: {
        type: String,
        enum: ['recruiter', 'applicant'], 
        required: true
    },
    resume: String, 
    profilePic: String,
    verificationToken: {
        type: String,
        default: null
    },
    verified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const userModel = mongoose.model('User', userSchema);

module.exports = { userModel };



// creator: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "userModel"
// },