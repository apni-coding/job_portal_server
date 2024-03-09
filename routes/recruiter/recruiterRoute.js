const express = require('express');
const { createJob, getFilterBasedJobs } = require('../../controllers/recruiter/job');
const { recruiterAuthValidation } = require('../../middlewares/recruiterAuthValidation');
const { getJobWithTotalApplication, getApplicationByJobId } = require('../../controllers/recruiter/application');

const recuriterRouter = express.Router();

recuriterRouter.post('/createjob', recruiterAuthValidation, createJob );
recuriterRouter.get('/getmyjob/:isActive', recruiterAuthValidation, getFilterBasedJobs );
recuriterRouter.get('/jobs-with-application-count', recruiterAuthValidation, getJobWithTotalApplication);
recuriterRouter.get('/get-application-by-jobid/:id', recruiterAuthValidation, getApplicationByJobId);

module.exports={recuriterRouter}
