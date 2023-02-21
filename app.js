const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const error404 = document.querySelector(".not-found");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const searchBox = document.querySelector(".search-box");

search.addEventListener("click", () => {
  const APIKey = "ea4c41be3f1ac062922bd76e8fd2c24c";
  const city = document.querySelector(".search-box input").value;
  if (city === "") return;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "25rem";
        error404.style.display = "block";
        error404.classList.add("fadeIn");

        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";

        return;
      }
      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;
        case "Rain":
          image.src = "images/rain.png";
          break;
        case "Snow":
          image.src = "images/snow.png";
          break;
        case "Clouds":
        case "Fog":
          image.src = "images/cloud.png";
          break;
        case "Haze":
        case "Mist":
          image.src = "images/mist.png";
          break;
        default:
          image.src = "images/mist.png";
      }
      container.style.height = "37.5rem";

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)} km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
    });
});

searchBox.addEventListener("keyup", (event) => {
  event.preventDefault();
  const city = document.querySelector(".search-box input").value;
  if (city === "") return;
  if (event.keyCode === 13) search.click();
});
