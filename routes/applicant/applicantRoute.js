const express = require('express');
const { getAllJobs } = require('../../controllers/applicant/applicantJob');


const applicantRouter = express.Router();

applicantRouter.get('/alljob', getAllJobs);


module.exports={applicantRouter}
