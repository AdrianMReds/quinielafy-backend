const asyncHandler = require("express-async-handler");
const Tournament = require("../models/tournamentModel");

//@desc Crear torneo
//@route POST /api/torneos
//@access Private ADMINS
const createTournament = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Agrega un nombre al torneo");
  }

  console.log("llegué a createTournament");

  const tournament = await Tournament.create({
    name: req.body.name,
    matcher: [],
    results: [],
  });
  res.status(200).json(tournament);
});

module.exports = {
  createTournament,
};
