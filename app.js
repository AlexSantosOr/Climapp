const apiKey = "79bc08f8e302cd681277dc44fd7fb04b"; // Reemplaza con tu llave o mantenla segura
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");
const errorMsg = document.getElementById("errorMsg");

const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const description = document.getElementById("description");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        showError("Por favor ingresa el nombre de una ciudad.");
    }
});

async function getWeather(city) {
    hideError();
    weatherResult.classList.add("hidden");

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${apiKey}`);
        
        // Manejo de errores de respuesta de red o API
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Ciudad no encontrada. Verifica el nombre.");
            } else if (response.status === 401) {
                throw new Error("API Key inválida o inactiva.");
            } else {
                throw new Error("Ocurrió un error al consultar el clima.");
            }
        }

        const data = await response.json();
        displayWeather(data);

    } catch (error) {
        showError(error.message);
    }
}

function displayWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temp.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    weatherResult.classList.remove("hidden");
}

function showError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.remove("hidden");
}

function hideError() {
    errorMsg.textContent = "";
    errorMsg.classList.add("hidden");
}