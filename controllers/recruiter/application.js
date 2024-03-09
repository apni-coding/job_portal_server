const { applicationModel } = require("../../models/applicationSchema");
const { jobModel } = require("../../models/jobModel");
const { userModel } = require("../../models/userModel");
const { INTERNAL_SERVER_ERROR } = require("../../response_messages/errorMessage");
const { ERROR, SUCCESS } = require("../../response_messages/statusCode");

exports.getJobWithTotalApplication = async (req, res) => {
    try {
      const userId = req.userId;
      const jobDetails = await jobModel.find({ jobOwnerId: userId, isOpening: true });
  
      // Get total application count for all jobs concurrently
      const applicationCountsPromises = jobDetails.map(async (job) => {
        const applicationCount = await applicationModel.countDocuments({ job: job._id, status: 'pending' });
        return { ...job.toObject(), applicationCount };
      });
      const jobDetailsWithApplicationCount = await Promise.all(applicationCountsPromises);
  
      res.status(SUCCESS).json(jobDetailsWithApplicationCount);
    } catch (error) {
      console.error(error);
      res.status(ERROR).json({ error: INTERNAL_SERVER_ERROR });
    }
  };
  

exports.getApplicationByJobId = async (req, res) => {
    try {
        const userId = req.userId;
        const  jobId  = req.params.id;
        
        // Find job information
        const jobInfo = await jobModel.findOne({ _id: jobId, isOpening: true });
        if (!jobInfo) {
            return res.status(ERROR).json({ error: "Job not found" });
        }
        // Find applications for the job
        const applications = await applicationModel.find({ job: jobId, status:'pending' });
        // Retrieve user information for each application
        const userInfoPromises = applications.map(async (application) => {
            const user = await userModel.findOne({ _id: application.user });
            return user;
        });
        const userInfo = await Promise.all(userInfoPromises);
        // Return job information and user information
        res.status(SUCCESS).json({ jobInfo, userInfo });
    } catch (error) {
        console.error(error);
        res.status(ERROR).json({ error: INTERNAL_SERVER_ERROR });
    }
};
