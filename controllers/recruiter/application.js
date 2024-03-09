const { applicationModel } = require("../../models/applicationSchema");
const { jobModel } = require("../../models/jobModel");
const { INTERNAL_SERVER_ERROR } = require("../../response_messages/errorMessage");
const { ERROR, SUCCESS } = require("../../response_messages/statusCode");

exports.getJobWithTotalApplication = async (req, res) => {
  try {
    const userId = req.userId;
    const jobDetails = await jobModel.find({ jobOwnerId: userId, isOpening: true });
    let totalApplicationCount = 0
    const jobDetailsWithApplicationCount = await Promise.all(jobDetails.map(async (job) => {
      const applicationCount = await applicationModel.countDocuments({ job: job._id, status: 'pending' });
      totalApplicationCount += applicationCount;
      return { ...job.toObject(), totalApplicationCount };
    }));

    res.status(SUCCESS).json( jobDetailsWithApplicationCount );
  } catch (error) {
    console.error(error);
    res.status(ERROR).json({ error: INTERNAL_SERVER_ERROR });
  }
};
