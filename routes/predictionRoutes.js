const express = require("express");
const router = express.Router();
const { createPrediction } = require("../controllers/predictionController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, createPrediction);
// router.route("/:id").put(protect, updateTeam);

module.exports = router;
