// // const data={
// //     "Ahemdabad":"40C",
// //     "Bharuch":"35C",
// //     "Bengaluru":"29C"
// // }

// // const btn=document.querySelector(".pra2-btn")
// // const location=document.querySelector(".location");


// // btn.addEventListener("click",()=>{

// // })

// // Hardcoded weather data
// const weatherData = {
//   "Ahmedabad": "35°C",
//   "Delhi": "38°C",
//   "Mumbai": "34°C",
//   "Bengaluru": "30°C",
//   "Chennai": "36°C"
// };


// const button = document.querySelector(".pra2-btn");
// const location = document.querySelector(".location");
// const weatherInfo = document.querySelector(".weather-info");

// // Add event listener
// button.addEventListener("click", () => {
//   const city = location.textContent

//   if (weatherData[city]) {
//     weatherInfo.textContent = `The weather in ${city} is ${weatherData[city]}`;
//   } else {
//     weatherInfo.textContent = `Weather information for ${city} is not available.`;
//   }
// });


const button = document.querySelector(".pra2-btn");
const cityInput = document.getElementById("city-input");
const weatherInfoElement = document.getElementById("weather-info");


const apiKey = "caad0f1af48e4cbbb9f81841253006";

button.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (city === "") {
    weatherInfoElement.textContent = "Please enter a city name.";
    return;
  }

  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;

  weatherInfoElement.textContent = "Fetching weather data...";

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found or API error.");
      }

      return response.json();
    })
    .then(data => {
      const temperature = data.current.temp_c;
      weatherInfoElement.textContent = `The weather in ${city} is ${temperature}°C .`;
    })
    .catch(error => {
      weatherInfoElement.textContent = `Error: ${error.message}`;
    });
});
