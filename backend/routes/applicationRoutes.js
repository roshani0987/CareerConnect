
const express = require("express");
const router = express.Router();

const {
    applyForJob,
    getMyApplications
} = require("../controllers/applicationController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, applyForJob);
router.get("/my", protect, getMyApplications);

module.exports = router;

