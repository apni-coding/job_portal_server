const express = require('express');
const { getAllJobs, newApplication } = require('../../controllers/applicant/applicantJob');
const { applicantAuthValidation } = require('../../middlewares/applicantAuthValidation');
const { isToken } = require('../../middlewares/isUser');


const applicantRouter = express.Router();

applicantRouter.get('/alljob', isToken, getAllJobs);
applicantRouter.post('/applyjob/', applicantAuthValidation, newApplication);


module.exports={applicantRouter}
