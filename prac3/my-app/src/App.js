import './App.css';
import React,{useState,useEffect} from 'react';


function App() {

  var [date,setDate]=useState(new Date());

  useEffect (() =>
    {

    const timer  = setInterval(() => {
        setDate(new Date());
    }, 1000);
     return () => clearInterval(timer);
     }, []);


  const formattedDate = date.toLocaleDateString(); 
  const formattedTime = date.toLocaleTimeString(); 

  return (
    <div className="App">
      <h1>Welcome to Charusat!!!</h1>s
       <h2>it is {formattedDate} </h2>
       <h2>it is {formattedTime}</h2>
    </div>
  );
}

export default App;
