import { useState } from "react";
import "./App.css";
import { evaluate } from "mathjs";

function App() {
  const [input, setInput] = useState("");


  const handleClick = (sign) => {
    setInput((prev) => prev + sign);
  };


  const handleEqual = () => {
    try {
      const result = evaluate(input);
      setInput(String(result));
    } catch (error) {
      setInput("Error");
    }
  };


  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  return (
    <div className="calculator" >
     
      <div className="result">
        <span>{input || "0"}</span>
      </div>

      <div className="operators">
        <button onClick={() => handleClick("+")}>+</button>
        <button onClick={() => handleClick("-")}>-</button>
        <button onClick={() => handleClick("*")}>*</button>
        <button onClick={() => handleClick("/")}>/</button>
        <button style={{ backgroundColor: "red" }} onClick={handleDelete}>DEL</button>
        <button style={{ backgroundColor: "orange" }} onClick={() => setInput("")}>AC</button>

      </div>

      <div className="numbers">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button key={num} onClick={() => handleClick(num.toString())}>
            {num}
          </button>
        ))}
        <button onClick={() => handleClick(".")}>.</button>
        <button style={{backgroundColor:"#0f0"}}onClick={handleEqual}>=</button>
      </div>
     
    </div>

  );
}

export default App; 
