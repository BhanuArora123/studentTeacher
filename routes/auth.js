const authController = require("../controllers/auth");
const express = require("express");
const router = express.Router();

router.post("/signup",authController.signup);
router.post("/login",authController.login);

module.exports = router;