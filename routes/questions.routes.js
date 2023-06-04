const express = require("express")
const {AskQuestion} = require("../controllers/question.controller")
const {
  getAllquestions,
  deleteQuestion,
  voteQuestion,
} =require ("../controllers/question.controller");
const router = express.Router();

router.post("/Ask", AskQuestion);
router.get("/get", getAllquestions);
router.delete("/delete/:id", deleteQuestion);
router.patch("/vote/:id", voteQuestion);

module.exports = router;
