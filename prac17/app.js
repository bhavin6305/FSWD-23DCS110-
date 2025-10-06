const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const Student = require("./models/student");

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("views"));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.get("/", async (req, res) => {
  const students = await Student.find();
  res.render("index", { students });
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", async (req, res) => {
  const { name, rollNo, course, contact } = req.body;
  await Student.create({ name, rollNo, course, contact });
  res.redirect("/");
});

app.get("/edit/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.render("edit", { student });
});

app.post("/edit/:id", async (req, res) => {
  const { name, rollNo, course, contact } = req.body;
  await Student.findByIdAndUpdate(req.params.id, { name, rollNo, course, contact });
  res.redirect("/");
});

app.get("/delete/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
