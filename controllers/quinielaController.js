//@desc Registrar usuario
//@route POST /api/usuarios
//@access Public
const createQuiniela = (req, res) => {
  res.status(200).json({ message: "Quiniela creada" });
};

module.exports = { createQuiniela };
