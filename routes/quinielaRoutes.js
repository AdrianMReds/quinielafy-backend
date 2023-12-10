const express = require("express");
const router = express.Router();
const {
  createQuiniela,
  getQuinielas,
  updateQuiniela,
} = require("../controllers/quinielaController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getQuinielas).post(protect, createQuiniela);
router.route("/:id").put(protect, updateQuiniela);

module.exports = router;
