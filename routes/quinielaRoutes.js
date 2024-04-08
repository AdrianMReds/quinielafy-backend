const express = require("express");
const router = express.Router();
const {
  createQuiniela,
  getQuinielas,
  updateQuiniela,
  getQuinielaData,
  deleteQuiniela,
} = require("../controllers/quinielaController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getQuinielas).post(protect, createQuiniela);
router
  .route("/:id")
  .put(protect, updateQuiniela)
  .get(protect, getQuinielaData)
  .delete(protect, deleteQuiniela);

module.exports = router;
