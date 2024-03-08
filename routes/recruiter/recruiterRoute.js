const express = require('express');
const { createJob } = require('../../controllers/recruiter/job');
const { recruiterAuthValidation } = require('../../middlewares/recruiterAuthValidation');

const recuriterRouter = express.Router();

recuriterRouter.post('/createjob', recruiterAuthValidation, createJob );


module.exports={recuriterRouter}
