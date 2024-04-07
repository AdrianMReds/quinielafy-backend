const asyncHandler = require("express-async-handler");
const Quiniela = require("../models/quinielaModel");
const Tournament = require("../models/tournamentModel");
const Prediction = require("../models/predictionModel");

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
  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("Usuario no encontrado");
  }

  const quinielas = await Quiniela.find({
    users: { $in: [req.user.id] },
  })
    .populate("tournament")
    .populate("predictions");

  res.status(200).json(quinielas);
});

//@desc Mostrar quiniela
//@route GET /api/quinielas/{id}
//@access Private
const getQuinielaData = asyncHandler(async (req, res) => {
  const quiniela = await Quiniela.findById(req.params.id)
    .populate("predictions")
    .populate({
      path: "predictions",
      populate: {
        path: "match",
        populate: [{ path: "team1" }, { path: "team2" }],
      },
    })
    .exec();

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
//@access Private
const createQuiniela = asyncHandler(async (req, res) => {
  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  const { name, entranceMoney, tournament } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Agrega un nombre a la quiniela");
  }
  // if (!entranceMoney) {
  //   res.status(400);
  //   throw new Error("Agregué un monto de entrada");
  // }
  if (!tournament) {
    res.status(400);
    throw new Error("Agregué un torneo");
  }

  const checkTournament = await Tournament.findById(tournament);
  if (!checkTournament) {
    res.status(400);
    throw new Error("El torneo agregado no existe");
  }

  const quinielaid = uniqueId();

  const quiniela = await Quiniela.create({
    name,
    entranceMoney: entranceMoney ?? 0,
    currentJornada: 1,
    entranceCode: quinielaid,
    users: [req.user.id],
    admin: req.user.id,
    tournament,
  });

  // Obtener la lista de partidos del torneo asociado a la quiniela
  const matches = checkTournament.matches;

  console.log(`Tournament matches -> ${matches}`);

  // Crear predicciones para cada partido y asignarlas al usuario
  const predictions = matches.map((match) => ({
    user: req.user.id,
    quiniela: quiniela.id,
    match,
    predictedResult: {
      team1: -1,
      team2: -1,
    },
    modifiable: true,
  }));

  // Almacenar las predicciones en la base de datos
  const createdPredictions = await Prediction.create(predictions);

  // Asignar las predicciones a la lista de predictions de la quiniela
  quiniela.predictions = createdPredictions.map((prediction) => prediction.id);
  await quiniela.save();

  res.status(200).json(quiniela);
});

//@desc Actualizar quiniela
//@route PUT /api/quinielas/{id}
//@access Private
const updateQuiniela = asyncHandler(async (req, res) => {
  const quiniela = await Quiniela.findById(req.params.id);

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

//@desc Eliminar quiniela
//@route DELETE /api/quinielas/:id
//@access Private
const deleteQuiniela = asyncHandler(async (req, res) => {
  const quiniela = await Quiniela.findById(req.params.id);

  if (!quiniela) {
    res.status(404);
    throw new Error("Quiniela no encontrada");
  }

  // Check if the logged in user is authorized to delete this quiniela
  if (quiniela.admin.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Usuario no autorizado para eliminar esta quiniela");
  }

  const deletedQuiniela = await Quiniela.deleteOne({ _id: req.params.id });

  if (deletedQuiniela.deletedCount === 1) {
    res.status(200).json({ message: "Quiniela eliminada correctamente" });
  } else {
    res.status(500);
    throw new Error("Error al eliminar la quiniela");
  }
});

module.exports = {
  getQuinielas,
  createQuiniela,
  updateQuiniela,
  getQuinielaData,
  deleteQuiniela,
};
