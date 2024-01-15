const mongoose = require("mongoose");

const quinielaSchema = mongoose.Schema(
  {
    //Input
    name: {
      type: String,
      required: [true, "Por favor dale un nombre a la quiniela"],
    },
    //Generado automáticamente
    entranceCode: {
      type: String,
      required: true,
    },
    //Input
    entranceMoney: {
      type: Number,
      required: true,
    },
    //Generado automáticamente
    currentJornada: {
      type: Number,
      required: true,
    },
    //Se va generando automáticamente
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    //Generado automáticamente
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    //Input
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },
    // Generado automáticamente
    predictions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Prediction",
      },
    ],
    // Generado automáticamente
    leaderboard: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        points: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiniela", quinielaSchema);
