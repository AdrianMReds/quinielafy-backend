const asyncHandler = require("express-async-handler");
const Quiniela = require("../models/quinielaModel");

const uniqueId = () => {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substring(2);
  return dateString + randomness;
};

//@desc Mostrar quinielas
//@route GET /api/quinielas
//@access Private
const getQuinielas = asyncHandler(async (req, res) => {
  const quinielas = await Quiniela.find({});

  res.status(200).json(quinielas);
});

//@desc Crear quiniela
//@route POST /api/quinielas
//@access Public
const createQuiniela = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name to the quiniela");
  }
  if (!req.body.entranceMoney) {
    res.status(400);
    throw new Error("Please tell if there is a price");
  }
  const quinielaid = uniqueId();

  const quiniela = await Quiniela.create({
    name: req.body.name,
    entranceMoney: req.body.entranceMoney,
    entranceCode: quinielaid,
  });
  res.status(200).json(quiniela);
});

//@desc Actualizar quiniela
//@route PUT /api/quinielas
//@access Private
const updateQuiniela = asyncHandler(async (req, res) => {
  const goal = Quiniela.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("No se encontró esa quiniela");
  }

  const quinielaActualizada = await Quiniela.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(quinielaActualizada);
});

module.exports = { getQuinielas, createQuiniela, updateQuiniela };
