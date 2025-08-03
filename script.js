
const apiKey = "4a3edadb3a8b63605ed9e19bbcf69baf";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        
        if (!response.ok) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return; 
        }

        const data = await response.json();

        
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        
        if (data.weather[0].icon) {
            const iconCode = data.weather[0].icon;
            weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        }

        
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    } catch (error) {
       
        console.error("Fetch Error:", error);
        document.querySelector(".error").innerHTML = "Network error. Please check your connection.";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}


searchBtn.addEventListener("click", () => {
    if (searchBox.value) { 
        checkWeather(searchBox.value);
    }
});

searchBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter" && searchBox.value) { 
        checkWeather(searchBox.value);
    }
});