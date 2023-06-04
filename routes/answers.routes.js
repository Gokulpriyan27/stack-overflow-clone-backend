const express = require("express");
const {postAnswer,deleteAnswer} =require("../controllers/answers.controller")
const router = express.Router();


router.patch("/post/:id", postAnswer);
router.patch("/delete/:id", deleteAnswer);

module.exports = router;
