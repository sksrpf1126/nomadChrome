//navigator geolocation을 통해 사용자의 위치 정보 파악 (위도, 경도)

const API_KEY = 'X'
function onGeoOk(position) {
  const lat = position.coords.latitude //위도
  const lon = position.coords.longitude //경도
  console.log(lat, lon)

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const weather = document.querySelector('#weather span:first-child')
      const city = document.querySelector('#weather span:last-child')
      city.innerText = data.name
      weather.innerText = `${data.weather[0].main} / ${Math.floor(
        data.main.temp - 273.15
      )}`
    })
}

function onGeoError() {
  console.log('못 찾 겠 다.')
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError)
