const mongoose = require("mongoose");

const matchSchema = mongoose.Schema(
  {
    team1: {
      type: String,
      required: true,
    },
    team2: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    jornada: Number,
    result: {
      team1: Number,
      team2: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Match", matchSchema);
