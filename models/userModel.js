const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Agrega un nombre"] },
    email: {
      type: String,
      required: [true, "Agrega un email"],
      unique: true,
    },
    password: { type: String, required: [true, "Agrega un password"] },
    birthday: { type: Date, required: true },
    // sex: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    // favoriteTeam: { type: String, required: true },
    admin: { type: Boolean, default: false },
    quinielas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiniela",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
