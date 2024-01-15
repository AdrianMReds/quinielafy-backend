const asyncHandler = require("express-async-handler");
const Prediction = require("../models/predictionModel");

//Prediction no tiene un POST porque se crean cuando se crea la quiniela o cuando alguien entra a la quiniela

//@desc Actualizar prediccion
//@route PUT /api/predicciones/{id}
//@access Private
const updatePrediccion = asyncHandler(async (req, res) => {
  const prediction = await Prediction.findById(req.params.id);

  if (!prediction) {
    res.status(400);
    throw new Error("No se encontró esa predicción");
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  const prediccionActualizada = await Prediction.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(prediccionActualizada);
});

module.exports = { updatePrediccion };
