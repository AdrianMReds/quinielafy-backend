const asyncHandler = require("express-async-handler");
const Quiniela = require("../models/quinielaModel");

const uniqueId = () => {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substring(2);
  return dateString + randomness;
};

const checkIdsArray = (ids, userid) => {
  let contains = false;
  ids.forEach((element) => {
    if (element.toString() === userid) {
      contains = true;
    }
  });
  return contains;
};

//@desc Mostrar quinielas
//@route GET /api/quinielas
//@access Private
const getQuinielas = asyncHandler(async (req, res) => {
  //TODO: Checar req.user ???
  const quinielas = await Quiniela.find({ users: { $in: [req.user.id] } });

  res.status(200).json(quinielas);
});

//@desc Mostrar quiniela
//@route GET /api/quinielas/{id}
//@access Private
const getQuinielaData = asyncHandler(async (req, res) => {
  const quiniela = await Quiniela.findById(req.params.id).exec();

  if (!quiniela) {
    res.status(400);
    throw new Error("No se encontró esa quiniela");
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("Usuario no encontrado");
  }

  // Make sure the logged in user matches the quiniela user
  if (!checkIdsArray(quiniela.users, req.user.id)) {
    res.status(401);
    throw new Error("Usuario no autorizado");
  }

  res.status(200).json(quiniela);
});

//@desc Crear quiniela
//@route POST /api/quinielas
//@access Public
const createQuiniela = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Agrega un nombre a la quiniela");
  }
  if (!req.body.entranceMoney) {
    res.status(400);
    throw new Error("Agregué un monto de entrada");
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  const quinielaid = uniqueId();

  const quiniela = await Quiniela.create({
    name: req.body.name,
    entranceMoney: req.body.entranceMoney,
    entranceCode: quinielaid,
    admin: req.user.id,
    users: [req.user.id],
  });
  res.status(200).json(quiniela);
});

//@desc Actualizar quiniela
//@route PUT /api/quinielas/{id}
//@access Private
const updateQuiniela = asyncHandler(async (req, res) => {
  const quiniela = Quiniela.findById(req.params.id);

  if (!quiniela) {
    res.status(400);
    throw new Error("No se encontró esa quiniela");
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the quiniela user
  if (quiniela.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const quinielaActualizada = await Quiniela.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(quinielaActualizada);
});

module.exports = {
  getQuinielas,
  createQuiniela,
  updateQuiniela,
  getQuinielaData,
};
