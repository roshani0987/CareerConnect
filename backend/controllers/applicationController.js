
const Application = require("../models/Application");
const Job = require("../models/Job");

// APPLY FOR JOB
const applyForJob = async (req, res) => {
    try {
        const { jobId, resumeLink } = req.body;

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required"
            });
        }

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        const application = await Application.create({
            user: req.user.id,
            job: jobId,
            resumeLink
        });

        res.status(201).json({
            message: "Application submitted successfully",
            application
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Already applied for this job"
            });
        }

        res.status(500).json({
            message: error.message
        });
    }
};

// GET MY APPLICATIONS
const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({
            user: req.user.id
        }).populate("job");

        res.status(200).json({
            success: true,
            applications
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    applyForJob,
    getMyApplications
};
