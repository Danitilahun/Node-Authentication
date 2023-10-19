require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const corsOptions = require("./config/corsOptions");
const ErrorHandler = require("./utils/errorHandler");
const credentials = require("./middleware/credentials");
const connectDB = require("./config/dbConnection");
const api = require("./routes/api");

const PORT = process.env.PORT || 3500;

const app = express();

app.use(credentials);
app.use(cors(corsOptions));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.json({ limit: "60mb", extended: true }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(morgan("common"));
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "/public")));

// Connect to MongoDB
connectDB();

app.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use("/api", api);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(ErrorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});
