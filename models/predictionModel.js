const mongoose = require("mongoose");

const predictionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quiniela: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiniela",
      required: true,
    },
    match: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
      required: true,
    },
    predictedResult: {
      team1: {
        type: Number,
        required: true,
      },
      team2: {
        type: Number,
        required: true,
      },
    },
    modifiable: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prediction", predictionSchema);
