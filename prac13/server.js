const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.render("form", { error: null, result: null });
});

app.post("/submit", (req, res) => {
  const source1 = parseFloat(req.body.source1);
  const source2 = parseFloat(req.body.source2);

  // Validate inputs
  if (isNaN(source1) || isNaN(source2)) {
    return res.render("form", {
      error: "❌ Please enter valid numbers for both income sources.",
      result: null,
    });
  }

  const totalIncome = source1 + source2;

  res.render("form", { error: null, result: totalIncome });
});

// Start server
app.listen(port, () => {
  console.log(`✅ Tax Form app running at http://localhost:${port}`);
});
