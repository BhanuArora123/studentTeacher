const favouriteController = require("../controllers/favourite");
const express = require("express");
const router = express.Router();

router.post("/addFav",favouriteController.addFavourite);
router.get("/mostFav",favouriteController.mostFav);
router.delete("/removeFav/:teacherId",favouriteController.removeTeacher);

module.exports = router;