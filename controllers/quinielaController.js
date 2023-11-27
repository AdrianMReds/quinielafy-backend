const asyncHandler = require("express-async-handler");

//@desc Mostrar quinielas
//@route GET /api/quinielas
//@access Private
const getQuinielas = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Todas las quinielas" });
});

//@desc Crear quiniela
//@route POST /api/quinielas
//@access Public
const createQuiniela = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Quiniela creada" });
});

//@desc Actualizar quiniela
//@route PUT /api/quinielas
//@access Private
const updateQuiniela = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Quiniela actualizada" });
});

module.exports = { getQuinielas, createQuiniela, updateQuiniela };
