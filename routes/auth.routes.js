const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/auth.controller");
const { getAllUsers, updateProfile } = require("../controllers/users.controller");


router.post("/register", register);
router.post("/login", login);

router.get("/getAllUsers", getAllUsers);
router.patch("/update/:id", updateProfile);

module.exports = router;
