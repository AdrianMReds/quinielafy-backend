const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc Registrar usuario
//@route POST /api/usuarios
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    birthday,
    // sex,
    country,
    state,
    city,
    // favoriteTeam,
  } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !birthday ||
    // !sex ||
    !country ||
    !state ||
    !city
    // !favoriteTeam
  ) {
    res.status(400);
    throw new Error("Agrega todos los campos al usuario");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Ya existe un usuario con ese correo");
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    birthday,
    // sex,
    country,
    state,
    city,
    // favoriteTeam,
    admin: false,
    quinielas: [],
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  res.status(200).json({ message: "Usuario registrado" });
});

//@desc Login usuario
//@route POST /api/usuarios/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Credenciales inválidas");
  }

  res.status(200).json({ message: "Usuario login" });
});

//@desc Obtener información de usuario
//@route GET /api/usuarios/data
//@access Private
const getUserData = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json({ id: req.user.id, name: req.user.name, email: req.user.email });
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { registerUser, loginUser, getUserData };
