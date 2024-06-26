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
app.use("/api/torneos", require("./routes/tournamentRoutes"));
app.use("/api/partidos", require("./routes/matchRoutes"));
app.use("/api/equipos", require("./routes/teamRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App is listening to port: ${port}`);
});
