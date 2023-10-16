const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/job");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(authRoutes);
app.use(jobRoutes);

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.json({
    title: "Active",
    message: "All good!!",
  });
});
app.get("/health", (req, res) => {
  res.json({
    service: "job-listing-server",
    status: "active",
    time: new Date(),
  });
});

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() =>
      console.log(`server running at http://localhost:${process.env.PORT}`)
    )
    .catch((error) => console.log(error));
});
