import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState("");
  const [count, setCount] = useState(0);


  const reset = () => setCount(0);
  const increment = () => setCount((prev) => prev + 1)
  const decrement = () => setCount((prev) => prev - 1)
  const increment5 = () => setCount((prev) => prev + 5)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName) {
      setErrors("firstname is required");
    }
    else if (!lastName) {
      setErrors("lastname is required");
    }
    else {
      alert(`firstname:${firstName} \n lastname:${lastName}`);
    }
  }

  return (
    <div className='container'>
      <div className='main'>
        <div>
          <h1 id="count">Count: {count}</h1>
        </div>

        <div >
          <button className='btn' onClick={reset}>Reset</button>
          <button className='btn' onClick={increment}>Increment</button>
          <button className='btn' onClick={decrement}>Decrement</button>
          <button className='btn' onClick={increment5}>Increment 5</button>
        </div>


        <div>
          <h1>Welcome to CHARUSAT!!!</h1>
        </div>

        <form action="" onSubmit={handleSubmit} >
          <div className='input'>

            <label
              htmlFor="fn"
              className='label'>
              First Name:
            </label>
            <input type="text" id="fn" value={firstName} placeholder='Enter First Name'

              onChange={(e) => setFirstName(e.target.value)} />

            <label htmlFor="ln" className='label'>Last Name:</label>
            <input type="text" id="ln" placeholder='Enter Last Name' value={lastName}
              onChange={(e) => setLastName(e.target.value)} />

          </div>
        </form>



        <div>
          <p style={{fontWeight:"bold"}}>First Name:  {firstName}</p>
          <p style={{fontWeight:"bold"}}>Last Name: {lastName}</p>
        </div>

      </div>

    </div>
  )
}

export default App


// Form handling- Control form and form validation ,Uncontrolled components
