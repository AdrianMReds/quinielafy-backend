const express = require("express");
const router = express.Router();
const { updatePrediccion } = require("../controllers/predictionController");

const { protect } = require("../middleware/authMiddleware");

// router.route("/").post(protect, createPrediction);
router.route("/:id").put(protect, updatePrediccion);

module.exports = router;
