const express = require('express');
const { createJob, getFilterBasedJobs } = require('../../controllers/recruiter/job');
const { recruiterAuthValidation } = require('../../middlewares/recruiterAuthValidation');

const recuriterRouter = express.Router();

recuriterRouter.post('/createjob', recruiterAuthValidation, createJob );
recuriterRouter.get('/getmyjob/:isActive', recruiterAuthValidation, getFilterBasedJobs );


module.exports={recuriterRouter}
