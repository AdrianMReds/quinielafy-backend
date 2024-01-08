const mongoose = require("mongoose");

const quinielaSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Por favor dale un nombre a la quiniela"],
    },
    entranceCode: {
      type: String,
      required: true,
    },
    entranceMoney: {
      type: Number,
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },
    predictions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Prediction",
      },
    ],
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
