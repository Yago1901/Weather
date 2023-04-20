// Variaveis e selecao de elementos
const apiKey = "#";
const apiCountryURL = "#";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

// Funcoes
const toggleLoader = (e) => {
    loader.classList.toggle("hide");
}

async function getWeatherData(city) {
    toggleLoader();

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    toggleLoader();

    return (data);
}

// Tratamento de erro

const showErrorMessage = (e) => {
    errorMessageContainer.classList.remove("hide");
}

const hideInformation = (e) =>  {
    weatherContainer.classList.add("hide");
    errorMessageContainer.classList.add("hide");
}


// Todos os dados sobre o clima
const showWeatherData = async (city) =>   {
    hideInformation();

    const data = await getWeatherData(city);

    if(data.cod === "404")  {
        showErrorMessage();
        return;
    }

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/32.png`);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    weatherContainer.classList.remove("hide");

}


// Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

        const city = cityInput.value;

    showWeatherData(city);
})

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;

        showWeatherData(city);
    }
}
)
