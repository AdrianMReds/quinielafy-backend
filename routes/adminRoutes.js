const express = require("express");
const router = express.Router();
const {
  getAllQuinielas,
  getAllTorneos,
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");
router.route("/quinielas").get(protect, getAllQuinielas);
router.route("/torneos").get(protect, getAllTorneos);

module.exports = router;
