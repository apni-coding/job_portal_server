const express = require('express');
const { getAllJobs, newApplication, appliedJobs } = require('../../controllers/applicant/applicantJob');
const { applicantAuthValidation } = require('../../middlewares/applicantAuthValidation');
const { isToken } = require('../../middlewares/isUser');


const applicantRouter = express.Router();

applicantRouter.get('/alljob', isToken, getAllJobs);
applicantRouter.post('/applyjob/', applicantAuthValidation, newApplication);
applicantRouter.get('/appliedJobs', applicantAuthValidation, appliedJobs);



module.exports={applicantRouter}
