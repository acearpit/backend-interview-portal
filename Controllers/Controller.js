const User = require("../Models/User.js");
const Interview = require("../Models/Interview.js");

exports.getParticipants = async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
};

exports.getParticipantDetails = async (req, res) => {
  const userId = req.params.id;

  const user = await User.find({ userId });

  res.status(200).json(user);
};

exports.scheduleInterview = async (req, res) => {
  const interviewData = req.body;

  const st = new Date(interviewData.startTime),
    et = new Date(interviewData.endTime);

  if (interviewData.participants.length < 1) {
    res.status(500).json("Atleast 2 participants should be present in the interview!");
    return;
  }

  var isValid = true;
  const interviews = await Interview.find();

  interviews.forEach((interview) => {
    if (
      (!interviewData._id || interviewData._id !== interview._id) &&
      ((interview.startTime >= st && interview.startTime <= et) ||
        (interview.endTime >= st && interview.endTime <= et) ||
        (interview.startTime >= st && interview.endTime <= et) ||
        (interview.startTime <= st && interview.endTime >= et))
    ) {
      interviewData.participants.forEach((participant1) => {
        if (interview.participants.findIndex((participant2) => participant2.userId === participant1.userId) !== -1) isValid = false;
      });
    }
  });

  if (isValid) {
    let interview;

    if (interviewData._id) {
      interview = await Interview.findOneAndUpdate({ _id: interviewData._id }, interviewData);
    } else {
      interview = await Interview.create(interviewData);
    }

    res.status(201).json(interview);
  } else {
    res.status(500).json("The interview cannot be scheduled as interview timmings conflicts with existing interviews of some participants!");
  }
};

exports.getInterviewDetails = async (req, res) => {
  const interviewId = req.params.id;

  const interview = await Interview.findById(interviewId);

  res.status(200).json(interview);
};

exports.deleteInterview = async (req, res) => {
  const interviewId = req.params.id;

  await Interview.findByIdAndDelete(interviewId);

  res.status(202).json("Interview successfully deleted!");
};

exports.getAllInterviews = async (req, res) => {
  const interviews = await Interview.find();

  res.status(200).json(interviews);
};

exports.addUser = async (req, res) => {
  const userData = req.body;
  const newUser = await User.create({ userId: userData.userId, name: userData.name, email: userData.email, isAdmin: userData.isAdmin });

  res.status(201).json(newUser);
};
