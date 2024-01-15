const asyncHandler = require("express-async-handler");
const Team = require("../models/teamModel");

//@desc Crear equipo
//@route POST /api/equipos
//@access Private ADMINS
const createTeam = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Agrega un nombre al equipo");
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  console.log(req.user);

  // Make sure the logged in user is an admin
  if (!req.user.admin) {
    console.log(`El usuario ${req.user.name} no está autorizado`);
    res.status(401);
    throw new Error("User not authorized");
  }

  const team = await Team.create({
    name: req.body.name,
    apodo: req.body.apodo,
    img: req.img ?? "",
    tournaments: [],
  });
  res.status(200).json(team);
});

//@desc Actualizar partido
//@route PUT /api/partidos/{id}
//@access Private ADMIN
const updateTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);

  if (!team) {
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

  const equipoActualizado = await Team.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(equipoActualizado);
});

module.exports = {
  createTeam,
  updateTeam,
};
