const { jobModel } = require("../../models/jobModel");
const { INTERNAL_SERVER_ERROR } = require("../../response_messages/errorMessage");
const { SUCCESS, ERROR } = require("../../response_messages/statusCode");

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await jobModel.find({ isOpening: true });
        res.status(SUCCESS).json(jobs);
    } catch (error) {
        console.error(error);
        res.status(ERROR).json({ error: INTERNAL_SERVER_ERROR });
    }
};