const express = require("express");
const router = express.Router();
const { createTeam, updateTeam } = require("../controllers/teamController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, createTeam);
router.route("/:id").put(protect, updateTeam);

module.exports = router;
