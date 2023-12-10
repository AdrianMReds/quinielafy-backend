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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiniela", quinielaSchema);
