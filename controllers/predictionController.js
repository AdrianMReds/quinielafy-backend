const asyncHandler = require("express-async-handler");
const Prediction = require("../models/predictionModel");

//@desc Crear predicción
//@route POST /api/predicciones
//@access Private
const createPrediction = asyncHandler(async (req, res) => {
  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  const { match, predictedResult } = req.body;

  if (!match) {
    res.status(400);
    throw new Error("Por favor proporciona un partido");
  }
  if (!predictedResult) {
    res.status(400);
    throw new Error("Por favor proporciona una predicción");
  }

  const prediction = await Prediction.create({
    user: req.user._id,
    match,
    predictedResult,
  });
  res.status(200).json(prediction);
});

module.exports = { createPrediction };
