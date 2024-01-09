const express = require("express");
const router = express.Router();
const {
  createTournament,
  updateTorneo,
  getTournaments,
} = require("../controllers/tournamentController");

// TODO: Crear un protect para que solo administradores puedan manipular cualquier información de torneos
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, createTournament).get(protect, getTournaments);
router.route("/:id").put(protect, updateTorneo);

module.exports = router;
