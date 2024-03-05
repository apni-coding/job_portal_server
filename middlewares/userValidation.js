const Joi = require('joi');
const { ERROR } = require('../response_messages/statusCode');

const userValidation = (req, res, next)=>{
    const { firstName, lastName, gender, email, password, type, skills, resume, profilePic } = req.body;
    const userInfo = {
        firstName,
        lastName,
        gender,
        email,
        type, 
        skills, 
        password
    };
    const userValidationSchema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string(),
        gender: Joi.string().valid('male', 'female', 'other').required(),
        email: Joi.string().email().required(),
        // skills: Joi.array().items(Joi.string()).required(),
        skills: Joi.string().required(),
        type: Joi.string().valid('recruiter', 'applicant').required(),
        password: Joi.string().min(3).max(30).required(),
    });
    const {error} =  userValidationSchema.validate(userInfo);
   if(error){
    return res.status(ERROR).json({error: error.details[0].message});
   };
   next()
}



module.exports = {userValidation};
