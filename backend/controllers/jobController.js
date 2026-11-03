
const Job = require("../models/Job");

// GET ALL JOBS
const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: jobs.length,
            jobs
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET SINGLE JOB
const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.status(200).json(job);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// ADD NEW JOB
const createJob = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Admin access required"
            });
        }

        const job = await Job.create(req.body);

        res.status(201).json({
            message: "Job added successfully",
            job
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getJobs,
    getJobById,
    createJob
};
