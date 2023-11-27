const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
const connectDB = require("./config/db");

const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

app.use("/api/usuarios", require("./routes/userRoutes"));
app.use("/api/quinielas", require("./routes/quinielaRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App is listening to port: ${port}`);
});
