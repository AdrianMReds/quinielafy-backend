const express = require("express");
const router = express.Router();
const {
  createTournament,
  updateTorneo,
  getTournaments,
} = require("../controllers/tournamentController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, createTournament).get(protect, getTournaments);
router.route("/:id").put(protect, updateTorneo);

module.exports = router;
