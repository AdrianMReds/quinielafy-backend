const mongoose = require("mongoose");

const tournamentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Por favor dale un nombre al torneo"],
    },
    matches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Match",
      },
    ],
    results: [
      {
        match: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Match",
        },
        result: {
          team1: Number,
          team2: Number,
        },
      },
    ],
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tournament", tournamentSchema);
