const express = require("express");
const mysql = require("mysql2");
const apiRoutes = require("./api.js");
const path = require("path");
const dotenv = require("dotenv");
const { router: dbRouter } = require("./db.js");

require("dotenv").config();

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/db", dbRouter);
app.use("/api", apiRoutes);

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3500, () => {
  console.log("Server Running on Port 3500");
});