const API_KEY='26c5d31d60b0a96c0b28746817e921b9';
const URL = 'https://api.openweathermap.org/data/2.5/weather?'

window.addEventListener('load', async () => {

    const successCallback = async (position) => {
        const latitute = Math.round(position.coords.latitude).toFixed(2);
        const longitude = Math.round(position.coords.longitude).toFixed(2);
        const location = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitute}&lon=${longitude}&appid=${API_KEY}`);
        const data = await location.json();
        bindData(data);
    };

    const errorCallback = (error) => {
        alert(error.message);
    };

    await navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

    // https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key}0
})

async function fetchWeather(city_name) {
    const weather = await fetch(`${URL}q=${city_name}&appid=${API_KEY}`);
    const data = await weather.json();
    bindData(data);
}

function fetchReadableDate(unix_time) {
    let date = new Date(unix_time * 1000);
    const hour = date.getHours();
    const min = "0" + date.getMinutes();
    var formattedTime = hour + ':' + min.substr(-2);
    return formattedTime;
}

function bindData(data) {

    // Section - 1 (Location Display) 
    const cityName = document.getElementById("city-name");
    const country = document.getElementById("country");
    const sunRise = document.getElementById("sun-rise");
    const sunSet = document.getElementById("sun-set");

    cityName.innerHTML = "Location: " + data.name + ", ";
    country.innerHTML = data.sys.country;

    sunRise.innerHTML = "Sunrise: " + fetchReadableDate(data.sys.sunrise) + " AM";
    sunSet.innerHTML = "Sunset: " + fetchReadableDate(data.sys.sunset) + " PM";

    // Section - 2 (Temperature Display) 
    const temperature = document.getElementById("temperature");
    const currentTemp = document.getElementById("current-temp");
    const feelTemp = document.getElementById("feel-temp");
    const minTemp = document.getElementById("min-temp");
    const maxTemp = document.getElementById("max-temp");
    const humidity = document.getElementById("humidity");
    const visibility = document.getElementById("visibility");

    temperature.innerHTML = "Weather: " + data.weather[0].main;
    currentTemp.innerHTML = Math.round(data.main.temp).toFixed() - 273 + " °C";
    feelTemp.innerHTML = Math.round(data.main.feels_like).toFixed() - 273 + " °C";;
    minTemp.innerHTML = Math.round(data.main.temp_min).toFixed() - 273 + " °C";;
    maxTemp.innerHTML = Math.round(data.main.temp_max).toFixed() - 273 + " °C";;
    humidity.innerHTML = data.main.humidity + "%";
    visibility.innerHTML = data.visibility / 1000 + "KM";

    // visibility: in km.

    // Section - 3 (Wind Speed and direction)
    const windDirector = document.getElementById("wind-director");
    const windHeader = document.getElementById("wind-header");
    // console.log(data.wind.deg);
    windHeader.innerHTML = "Wind: " + data.wind.speed + 'Km/h';
    windDirector.style.transform = `rotate(${data.wind.deg}deg)`;
}

const submit = document.getElementById("submit");
submit.addEventListener('click', () => {
    const cityInput = document.getElementById("city-input");
    fetchWeather(cityInput.value);
})
