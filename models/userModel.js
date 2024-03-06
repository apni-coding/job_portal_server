const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: { //not use for recruiter
        type: String,
        enum: ['male', 'female', 'other'], 
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    skills:{
        type: [String],
        
    }, 
    type: {
        type: String,
        enum: ['recruiter', 'applicant'], 
        required: true
    },
    resume: String, 
    profile:{ //for recruiter use a compnay logo
        type: String,
        required: true
    },
    bio:{  //in recruiter case we use as a company description
        type: String, 
        required: true
    },
    contactNumber:{
        type: String,
        required: true
    },
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