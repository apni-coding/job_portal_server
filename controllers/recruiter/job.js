const { jobModel } = require("../../models/jobModel");
const { INTERNAL_SERVER_ERROR } = require("../../response_messages/errorMessage");
const { SUCCESS, ERROR } = require("../../response_messages/statusCode");

// Controller for creating a new job
exports.createJob = async (req, res) => {
  try {
    // Check if the user already has a job with the same title 
    const existingJob = await jobModel.findOne({
    jobOwnerId: req.userId,
      title: req.body.title,
    });

    if (existingJob) {
      return res.status(400).json({ error: 'You already have a job with the same title' });
    }

    // If not, create the new job
    const newJob = await jobModel.create({
      ...req.body,
      jobOwnerId: req.userId,
    });

    res.status(SUCCESS).json(newJob);
  } catch (error) {
    console.error(error);
    res.status(ERROR).json({ error: INTERNAL_SERVER_ERROR });
  }
};

// Controller for getting all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await jobModel.find({ isOpening: true });
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller for getting a single job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await jobModel.findOne({
      _id: req.params.jobId,
      isOpening: true,
    });

    if (!job) {
      res.status(404).json({ error: 'Job not found' });
    } else {
      res.status(200).json(job);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller for updating a job by ID
exports.updateJobById = async (req, res) => {
  try {
    const updatedJob = await jobModel.findOneAndUpdate(
      {
        _id: req.params.jobId,
        jobOwnerId: req.user.id,
      },
      req.body,
      { new: true }
    );

    if (!updatedJob) {
      res.status(404).json({ error: 'Job not found' });
    } else {
      res.status(200).json(updatedJob);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller for deleting a job by ID
exports.deleteJobById = async (req, res) => {
  try {
    const deletedJob = await jobModel.findOneAndDelete({
      _id: req.params.jobId,
      jobOwnerId: req.user.id,
    });

    if (!deletedJob) {
      res.status(404).json({ error: 'Job not found' });
    } else {
      res.status(200).json(deletedJob);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
