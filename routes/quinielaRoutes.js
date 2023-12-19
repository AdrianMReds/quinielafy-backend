const express = require("express");
const router = express.Router();
const {
  createQuiniela,
  getQuinielas,
  updateQuiniela,
  getQuinielaData,
} = require("../controllers/quinielaController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getQuinielas).post(protect, createQuiniela);
router.route("/:id").put(protect, updateQuiniela).get(protect, getQuinielaData);

module.exports = router;
