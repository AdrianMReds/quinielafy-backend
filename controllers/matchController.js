const asyncHandler = require("express-async-handler");
const Match = require("../models/matchModel");

//@desc Crear match
//@route POST /api/partidos
//@access Private ADMINS
const createMatch = asyncHandler(async (req, res) => {
  if (!req.body.team1) {
    res.status(400);
    throw new Error("Agrega equipo 1 (local)");
  }
  if (!req.body.team2) {
    res.status(400);
    throw new Error("Agrega equipo 2 (visitante)");
  }
  //TODO: Cuando se agregué creación de partidos desde front end descomentamos esto
  //   if (!req.body.date) {
  //     res.status(400);
  //     throw new Error("Agrega la fecha del partido");
  //   }

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

  const { team1, team2, date, jornada } = req.body;

  const tournament = await Match.create({
    team1,
    team2,
    date: Date.now(),
    results: {},
  });
  res.status(200).json(tournament);
});

module.exports = { createMatch };
