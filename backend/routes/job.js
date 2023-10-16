const express = require("express");
const router = express.Router();
const job = require("../models/job");
const verifyAuth = require("../middlewares/verifyAuth");
router.post("/job-post", verifyAuth, async (req, res) => {
  try {
    const {
      companyName,
      logoUrl,
      position,
      salary,
      jobType,
      remote,
      location,
      description,
      about,
      skillsRequired,
      recruiterName,
    } = req.body;
    console.log(skillsRequired, typeof skillsRequired);
    await job.create({
      companyName,
      logoUrl,
      position,
      salary,
      jobType,
      remote,
      location,
      description,
      about,
      skillsRequired,
      recruiterName,
    });

    res.json({
      message: "job-post created successfully",
      name: recruiterName,
    });
  } catch (error) {
    console.log(error);
  }
});
router.patch("/job-post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      companyName,
      logoUrl,
      position,
      salary,
      jobType,
      remote,
      location,
      description,
      about,
      skillsRequired,
      recruiterName,
    } = req.body;

    await job.findByIdAndUpdate(id, {
      companyName,
      logoUrl,
      position,
      salary,
      jobType,
      remote,
      location,
      description,
      about,
      skillsRequired,
      recruiterName,
    });
    res.json({
      status: "SUCCESS",
      message: "upadted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "FAILED",
      message: "something went wrong",
    });
  }
});

router.get("/get-jobs", async (req, res) => {
  try {
    const { skills } = req.query;
    const regexPattern = new RegExp(skills, "i");
    const jobs = await job.find({ skillsRequired: { $regex: regexPattern } });
    res.json({
      data: jobs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something went wrong",
    });
  }
});

router.get("/job-description/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const jobDetails = await job.findById(id);
    res.json({
      data: jobDetails,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "something went wrong",
    });
  }
});
module.exports = router;
