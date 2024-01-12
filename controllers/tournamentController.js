const asyncHandler = require("express-async-handler");
const Tournament = require("../models/tournamentModel");
const Team = require("../models/teamModel");
const Match = require("../models/matchModel");

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

  const { name, matches, teams, results } = req.body;

  if (teams) {
    const teamExistenceChecks = await Promise.all(
      teams.map((teamId) => Team.exists({ _id: teamId }))
    );

    if (teamExistenceChecks.includes(null)) {
      return res
        .status(400)
        .json({ error: "Al menos uno de los equipos no existe." });
    }
  }

  if (matches) {
    const matchExistenceChecks = await Promise.all(
      matches.map((matchId) => Match.exists({ _id: matchId }))
    );

    if (matchExistenceChecks.includes(null)) {
      return res
        .status(400)
        .json({ error: "Al menos uno de los partidos no existe." });
    }
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user is an admin
  if (!req.user.admin) {
    console.log(`El usuario ${req.user.name} no está autorizado`);
    res.status(401);
    throw new Error("User not authorized");
  }

  const tournament = await Tournament.create({
    name,
    matches: matches ?? [],
    teams: teams ?? [],
    results: results ?? [],
  });
  res.status(200).json(tournament);
});

//@desc Actualizar torneo
//@route PUT /api/torneos/{id}
//@access Private ADMIN
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
    console.log(`El usuario ${req.user.name} no está autorizado`);
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
