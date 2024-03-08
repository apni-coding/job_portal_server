const jwt = require('jsonwebtoken');
const { ERROR } = require('../response_messages/statusCode');
const { USER_NOT_AUTHORIZED } = require('../response_messages/errorMessage');


const applicantAuthValidation = async (req, res, next)=>{
    // console.log('her in middle')
    const Authorization = req.headers.Authorization || req.headers.authorization;
   
    if(Authorization && Authorization.startsWith("Bearer")){
        const token = Authorization.split(' ')[1];
        jwt.verify(token, process.env.JWTKEY, (err, info) =>{
            if(err){
                return res.status(ERROR).json({error: USER_NOT_AUTHORIZED});
            }
            if(info.userType !=='applicant'){
                return res.status(ERROR).json({error: USER_NOT_AUTHORIZED});
            }
            req.userId = info.userId;
            next();
        });
    }else{
        return res.status(ERROR).json({error: USER_NOT_AUTHORIZED});
    }
}

module.exports = {applicantAuthValidation}