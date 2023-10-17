const container = document.querySelector('.container');
const search = document.querySelector('.search-box');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

const temperatureElement = document.querySelector('.weather-box .temperature');
const descriptionElement = document.querySelector('.weather-box .description');
const humidityElement = document.querySelector('.weather-details .humidity span');
const windElement = document.querySelector('.weather-details .wind span');
const image = document.querySelector('.weather-box img');

search.addEventListener('submit', (e) => {
  e.preventDefault()
  const APIKey = '55f58b733821a84c44cf703662ec8ffa';
  const city = document.querySelector('.search-box input').value;

  if (city === '') return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {
      if (json.cod === '404') {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
      }

      error404.style.display = 'none';
      error404.classList.remove('fadeIn');

      switch (json.weather[0].main) {
        case 'Clear':
          image.src = 'images/clear.png';
          break;
        case 'Rain':
          image.src = 'images/rain.png';
          break;
        case 'Snow':
          image.src = 'images/snow.png';
          break;
        case 'Clouds':
          image.src = 'images/cloud.png';
          break;
        case 'Haze':
          image.src = 'images/haze.png';
          break;
        case 'Mist':
          image.src = 'images/mist.png'
        default:
          image.src = ''; // You can set a default image or leave it empty if there's none.
      }

      temperatureElement.innerHTML = `${parseInt(json.main.temp)}<span>°F</span>`; // Display temperature in Fahrenheit
      descriptionElement.innerHTML = `${json.weather[0].description}`;
      humidityElement.innerHTML = `${json.main.humidity}%`;
      windElement.innerHTML = `${parseInt(json.wind.speed)} mph`; // Display wind speed in mph

      weatherBox.style.display = '';
      weatherDetails.style.display = '';
      weatherBox.classList.add('fadeIn');
      container.style.height = '590px';
    });
});
