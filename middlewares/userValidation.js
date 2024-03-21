const Joi = require('joi');
const { ERROR } = require('../response_messages/statusCode');

const userValidation = (req, res, next) => {
    const { name, gender, email, password, type, skills, bio, contactNumber } = req.body;
    const userInfo = {
        name,
        gender,
        email,
        type,
        // skills,
        bio,
        contactNumber,
        password
    };
    const userValidationSchema = Joi.object({
        name: Joi.string().required(),
        gender: Joi.string().valid('male', 'female', 'other').allow('', null),
        email: Joi.string().email().required(),
        // skills: Joi.array().items(Joi.string()).allow('', null),
     
        type: Joi.string().valid('recruiter', 'applicant').required(),
        password: Joi.string().min(3).max(30).required(),
        contactNumber: Joi.string().required(),
        bio: Joi.string().required(),
        
    });
    const { error } = userValidationSchema.validate(userInfo);
    if (error) {
        return res.status(ERROR).json({ error: error.details[0].message });
    };
    next()
}



module.exports = { userValidation };
