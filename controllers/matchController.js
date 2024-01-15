const asyncHandler = require("express-async-handler");
const Match = require("../models/matchModel");
const Team = require("../models/teamModel");

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

  const { team1, team2, date, jornada } = req.body;

  const team1id = await Team.findById(req.body.team1);
  const team2id = await Team.findById(req.body.team2);

  if (!team1id || !team2id) {
    res.status(400);
    throw new Error(
      "Uno de los equipos no existe, favor de revisar los ids porporcionados"
    );
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

  const match = await Match.create({
    team1,
    team2,
    date: Date.now(),
    jornada: jornada ?? -1,
    results: {},
  });
  res.status(200).json(match);
});

//@desc Actualizar partido
//@route PUT /api/partidos/{id}
//@access Private ADMIN
const updateMatch = asyncHandler(async (req, res) => {
  const match = await Match.findById(req.params.id);

  if (!match) {
    res.status(400);
    throw new Error("No se encontró ese partido");
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

  const partidoActualizado = await Match.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(partidoActualizado);
});

module.exports = { createMatch, updateMatch };
