const { applicationModel } = require("../../models/applicationSchema");
const { jobModel } = require("../../models/jobModel");
const { userModel } = require("../../models/userModel");
const { INTERNAL_SERVER_ERROR, JOB_SUCESS_APPLY } = require("../../response_messages/errorMessage");
const { SUCCESS, ERROR } = require("../../response_messages/statusCode");

exports.getAllJobs = async (req, res) => {
    try {
        const  userId  = req.userId || null; 

        // Retrieve all open jobs
        const jobs = await jobModel.find({ isOpening: true });

        // Create an array to store company information for each job
        const companyInfoPromises = jobs.map(async (job) => {
            // Check if the user has already applied for the job
            const isJobAlreadyApplied = await applicationModel.exists({ user: userId, job: job._id });

            // If the user has not applied for the job, retrieve company information
            if (!isJobAlreadyApplied) {
                const company = await userModel.findById(job.jobOwnerId).select('-password');
                return { job, company };
            } else {
                return null; // Skip this job as the user has already applied for it
            }
        });

        // Wait for all company information promises to resolve
        const jobCompanyInfo = await Promise.all(companyInfoPromises);

        // Filter out the jobs where the user has already applied
        const jobsWithCompanyInfo = jobCompanyInfo.filter(item => item !== null);

        // Send response with combined data
        res.status(SUCCESS).json(jobsWithCompanyInfo);
    } catch (error) {
        console.error("Error while fetching job data:", error);
        res.status(ERROR).json({ error: INTERNAL_SERVER_ERROR });
    }
};


exports.newApplication = async (req, res) => {
    try {
        const userId = req.userId;
        const {jobId} = req.body;
        // const isJobAppiled = await applicationModel.find({user:userId, job:jobId})
        // if(isJobAppiled){
        //   return  res.status(ERROR).json({error:'Already Applied'});
        // }
        // save in db
        const job = await applicationModel.create({user:userId, job:jobId})
        res.status(SUCCESS).json({message:JOB_SUCESS_APPLY, job});
    } catch (error) {
        console.error("Error while fetching job data:", error);
        res.status(ERROR).json({ error: INTERNAL_SERVER_ERROR });
    }
};
