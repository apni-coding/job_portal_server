const { jobModel } = require("../../models/jobModel");
const { userModel } = require("../../models/userModel");
const { INTERNAL_SERVER_ERROR } = require("../../response_messages/errorMessage");
const { SUCCESS, ERROR } = require("../../response_messages/statusCode");

exports.getAllJobs = async (req, res) => {
    try {
        // Retrieve all open jobs
        const jobs = await jobModel.find({ isOpening: true });

        // Create an array to store company information for each job
        const companyInfoPromises = jobs.map(async (job) => {
            // Retrieve company information for each job owner
            const company = await userModel.findById(job.jobOwnerId).select('-password');
            return company;
        });

        // Wait for all company information promises to resolve
        const companyInfo = await Promise.all(companyInfoPromises);

        // Combine job data with company information
        const jobsWithCompanyInfo = jobs.map((job, index) => ({
            ...job.toObject(),
            companyInfo: companyInfo[index]
        }));

        // Send response with combined data
        res.status(SUCCESS).json(jobsWithCompanyInfo);
    } catch (error) {
        console.error("Error while fetching job data:", error);
        res.status(ERROR).json({ error: INTERNAL_SERVER_ERROR });
    }
};
