const asyncHandler = require("express-async-handler");
const Tournament = require("../models/tournamentModel");

//@desc Ver torneos
//@route GET /api/torneos
//@access Private
const getTournaments = asyncHandler(async (req, res) => {
  const torneos = await Tournament.find();

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (!torneos) {
    res.status(400);
    throw new Error("No se encontraron torneos");
  }

  res.status(200).json(torneos);
});

//@desc Crear torneo
//@route POST /api/torneos
//@access Private ADMINS
const createTournament = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Agrega un nombre al torneo");
  }

  console.log(req.user);

  // Make sure the logged in user is an admin
  if (!req.user.admin) {
    console.log(`El usuario ${req.user.name} no está autorizado`);
    res.status(401);
    throw new Error("User not authorized");
  }

  const tournament = await Tournament.create({
    name: req.body.name,
    matcher: [],
    results: [],
  });
  res.status(200).json(tournament);
});

//@desc Actualizar torneo
//@route PUT /api/torneos/{id}
//@access Private
const updateTorneo = asyncHandler(async (req, res) => {
  const tournament = Tournament.findById(req.params.id);

  if (!tournament) {
    res.status(400);
    throw new Error("No se encontró ese torneo");
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user is an admin
  if (!req.user.admin) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const torneoActualizado = await Tournament.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(torneoActualizado);
});

module.exports = {
  createTournament,
  updateTorneo,
  getTournaments,
};
