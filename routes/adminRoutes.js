const express = require("express");
const router = express.Router();
const { getAllQuinielas } = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");
router.route("/quinielas").get(protect, getAllQuinielas);

module.exports = router;
