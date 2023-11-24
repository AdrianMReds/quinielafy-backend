const express = require("express");
const router = express.Router();
const { createQuiniela } = require("../controllers/quinielaController");

router.post("/", createQuiniela);

module.exports = router;
