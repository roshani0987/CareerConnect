
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: String,
    type: String,
    description: String,
    skills: [String],
    salary: String,
    applyLink: String
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);

