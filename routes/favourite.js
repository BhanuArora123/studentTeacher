const favouriteController = require("../controllers/favourite");
const express = require("express");
const router = express.Router();

const isAuth = require("../utils/isAuth");

router.post("/addFav",isAuth,favouriteController.addFavourite);
router.get("/mostFav",isAuth,favouriteController.mostFav);
router.delete("/removeFav/:teacherId",isAuth,favouriteController.removeTeacher);
router.get("/getTeacher",isAuth,favouriteController.getTeacher)
module.exports = router;