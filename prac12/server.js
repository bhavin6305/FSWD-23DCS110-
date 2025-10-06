const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Serve calculator form with better design
app.get("/", (req, res) => {
  res.send(`
    <html>
    <head>
      <title>Kids Calculator</title>
      <style>
        body {
          background: linear-gradient(to right, #ffecd2, #fcb69f);
          font-family: Comic Sans MS, cursive, sans-serif;
          text-align: center;
          padding: 40px;
        }
        h1 {
          color: #ff4081;
          font-size: 3rem;
          margin-bottom: 20px;
        }
        form {
          background: #fff;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0px 6px 15px rgba(0,0,0,0.2);
          display: inline-block;
        }
        label {
          font-size: 1.2rem;
          font-weight: bold;
          color: #444;
        }
        input {
          width: 200px;
          padding: 10px;
          font-size: 1.2rem;
          margin: 10px 0 20px 0;
          border: 2px solid #ff4081;
          border-radius: 10px;
          text-align: center;
        }
        button {
          font-size: 1.2rem;
          padding: 12px 25px;
          margin: 8px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          color: white;
          transition: transform 0.2s ease-in-out;
        }
        button:hover {
          transform: scale(1.1);
        }
        .add { background-color: #4caf50; }
        .sub { background-color: #f44336; }
        .mul { background-color: #ff9800; }
        .div { background-color: #2196f3; }
        a {
          display: inline-block;
          margin-top: 20px;
          font-size: 1.2rem;
          text-decoration: none;
          color: #fff;
          background: #ff4081;
          padding: 10px 20px;
          border-radius: 12px;
        }
        h2 {
          color: #333;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <h1>🧮 Kids Calculator</h1>
      <form action="/calculate" method="post">
        <label>Enter First Number:</label><br/>
        <input type="text" name="num1" required /><br/>
        
        <label>Enter Second Number:</label><br/>
        <input type="text" name="num2" required /><br/>
        
        <button class="add" type="submit" name="operation" value="add">➕ Add</button>
        <button class="sub" type="submit" name="operation" value="subtract">➖ Subtract</button>
        <button class="mul" type="submit" name="operation" value="multiply">✖️ Multiply</button>
        <button class="div" type="submit" name="operation" value="divide">➗ Divide</button>
      </form>
    </body>
    </html>
  `);
});

app.post("/calculate", (req, res) => {
  const num1 = parseFloat(req.body.num1);
  const num2 = parseFloat(req.body.num2);
  const operation = req.body.operation;

  if (isNaN(num1) || isNaN(num2)) {
    return res.send(`
      <h2>❌ Invalid input! Please enter numbers only.</h2>
      <a href="/">🔙 Try Again</a>
    `);
  }

  let result;
  switch (operation) {
    case "add": result = num1 + num2; break;
    case "subtract": result = num1 - num2; break;
    case "multiply": result = num1 * num2; break;
    case "divide":
      if (num2 === 0) {
        return res.send(`
          <h2>⚠️ Cannot divide by zero!</h2>
          <a href="/">🔙 Try Again</a>
        `);
      }
      result = num1 / num2;
      break;
  }

  res.send(`
    <h1>🧮 Kids Calculator</h1>
    <h2>✅ Result: ${result}</h2>
    <a href="/">🔙 Back</a>
  `);
});

app.listen(port, () => {
  console.log(`✅ Kids Calculator running at http://localhost:${port}`);
});
