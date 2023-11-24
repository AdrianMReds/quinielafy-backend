//@desc Registrar usuario
//@route POST /api/usuarios
//@access Public
const registerUser = (req, res) => {
  res.status(200).json({ message: "Usuario registrado" });
};

module.exports = { registerUser };
