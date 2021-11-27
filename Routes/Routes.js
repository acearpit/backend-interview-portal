const express = require("express");
const router = express.Router();

const controller = require("../Controllers/Controller.js");

router.post("/addUser", controller.addUser);

router.get("/getParticipants", controller.getParticipants);
router.get("/getParticipantDetails/:id", controller.getParticipantDetails);

router.get("/interviews", controller.getAllInterviews);
router.get("/interview/:id", controller.getInterviewDetails);
router.put("/scheduleInterview", controller.scheduleInterview);
router.delete("/deleteInterview/:id", controller.deleteInterview);

module.exports = router;
