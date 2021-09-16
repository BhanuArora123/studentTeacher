const authController = require("../controllers/auth");
const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

router.post("/signup",[
    body("email").isEmail(),
    body("password").isLength({
        min:5
    }),
    body("name").isLength({
        min:3
    })
],
authController.signup);
router.post("/login",[
body("email").isEmail(),
    body("password").isLength({
        min:5
    })
]
,authController.login);

module.exports = router;