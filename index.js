const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

app.use("/api/usuarios", require("./routes/userRoutes"));
app.use("/api/quinielas", require("./routes/quinielaRoutes"));

app.listen(port, () => {
  console.log(`App is listening to port: ${port}`);
});
