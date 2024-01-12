const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  apodo: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  tournaments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
    },
  ],
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
