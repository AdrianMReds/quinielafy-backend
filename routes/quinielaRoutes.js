const express = require("express");
const router = express.Router();
const {
  createQuiniela,
  getQuinielas,
  updateQuiniela,
} = require("../controllers/quinielaController");

router.route("/").get(getQuinielas).post(createQuiniela);
router.route("/:id").put(updateQuiniela);

module.exports = router;
