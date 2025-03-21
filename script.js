const apiKey = "bf3e4326bc1cd0ed67feffa20876a83c";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorMessage = document.querySelector(".error");

async function checkWeather(city) {
    try {
        const response = await fetch(apiURL + city + `&appid=${apiKey}`);

        if (!response.ok) {
            if (response.status === 404) {
                errorMessage.style.display = "block";
                document.querySelector(".weather").style.display = "none";
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return;
        }

        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

        const weatherMain = data.weather[0].main;
        weatherIcon.src = `images/${weatherMain.toLowerCase()}.png`;

        document.querySelector(".weather").style.display = "block";
        errorMessage.style.display = "none";
    } catch (error) {
        console.error("Error fetching weather data:", error);
        errorMessage.style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});