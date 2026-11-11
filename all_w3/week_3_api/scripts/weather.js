const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const myKey = 'c21193fb56aed3f3ebfcc31dd9820104';
const myLat = '4.7164';
const myLon = '-74.2119';

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&units=imperial&appid=${myKey}`;

/**
 * 
 * @param {Object} data 
 */
function displayResults(data) {
  
  currentTemp.innerHTML = `${data.main.temp.toFixed(0)}&deg;F`;

  const iconCode = data.weather[0].icon;
  const iconsrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  const desc = data.weather[0].description;

  
  const capitalizedDesc = desc
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', capitalizedDesc);
  captionDesc.textContent = capitalizedDesc;
}

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      
      displayResults(data);
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    console.error('Error al consultar OpenWeatherMap:', error);
  }
}

apiFetch();