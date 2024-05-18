const asyncHandler = require("express-async-handler");
const Quiniela = require("../models/quinielaModel");
const Tournament = require("../models/tournamentModel");
const Prediction = require("../models/predictionModel");

//@desc Mostrar quinielas
//@route GET /api/admin/quinielas
//@access Private ADMIN
const getAllQuinielas = asyncHandler(async (req, res) => {
  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("Usuario no encontrado");
  }

  if (!req.user.admin) {
    res.status(401);
    throw new Error("Usuario no autorizado");
  }

  const quinielas = await Quiniela.find()
    .populate("tournament")
    .populate("predictions")
    .populate({
      path: "admin",
      select: "_id name email",
    });

  if (!quinielas) {
    res.status(400);
    throw new Error("No se encontraron quinielas como administrador");
  }

  res.status(200).json(quinielas);
});

module.exports = { getAllQuinielas };
