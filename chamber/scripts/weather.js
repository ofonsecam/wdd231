const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDesc = document.querySelector('#weather-desc');
const forecastContainer = document.querySelector('#forecast-cards');

const myKey = 'c21193fb56aed3f3ebfcc31dd9820104';
const myLat = '4.7164';
const myLon = '-74.2119';

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&units=metric&appid=${myKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLon}&units=metric&appid=${myKey}`;

/**
 * @param {string} text 
 * @returns {string}
 */
function capitalizeWords(text) {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * @param {Object} data 
 */
function displayCurrentWeather(data) {
  currentTemp.textContent = Math.round(data.main.temp);

  const iconCode = data.weather[0].icon;
  const iconSrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  const desc = capitalizeWords(data.weather[0].description);

  weatherIcon.setAttribute('src', iconSrc);
  weatherIcon.setAttribute('alt', desc);
  weatherDesc.textContent = desc;
}

/**
 * @param {Object} data 
 */
function displayForecast(data) {
  forecastContainer.innerHTML = '';


  const dailyData = data.list
    .filter(item => item.dt_txt.includes('12:00:00'))
    .slice(0, 3);

  dailyData.forEach(day => {

    const date = new Date(day.dt * 1000);

    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

    const iconCode = day.weather[0].icon;
    const iconSrc = `https://openweathermap.org/img/wn/${iconCode}.png`;
    const desc = capitalizeWords(day.weather[0].description);

    const card = document.createElement('div');
    card.classList.add('forecast-day');
    card.innerHTML = `
      <p class="day-name">${dayName.toUpperCase()}</p>
      <img src="${iconSrc}" alt="${desc}" width="40" height="40" loading="lazy">
      <p class="day-temp">${Math.round(day.main.temp)}°C</p>
    `;
    forecastContainer.appendChild(card);
  });
}


async function fetchWeather() {
  try {
    const response = await fetch(weatherUrl);
    if (!response.ok) {
      throw new Error(`HTTP error weather! Status: ${response.status}`);
    }
    const data = await response.json();
    displayCurrentWeather(data);
  } catch (error) {
    console.error('Error al cargar el clima actual:', error);
    weatherDesc.textContent = 'Unavailable';
  }
}


async function fetchForecast() {
  try {
    const response = await fetch(forecastUrl);
    if (!response.ok) {
      throw new Error(`HTTP error forecast! Status: ${response.status}`);
    }
    const data = await response.json();
    displayForecast(data);
  } catch (error) {
    console.error('Error al cargar el pronóstico:', error);
    forecastContainer.innerHTML = '<p class="error-msg">Pronóstico no disponible</p>';
  }
}

fetchWeather();
fetchForecast();