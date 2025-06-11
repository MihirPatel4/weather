const forecast = document.getElementById('forecast')
const cityForm = document.getElementById('choose-city')
const cityInput = document.getElementById('city-input')

async function getWeatherData(q) {
    let response = await fetch(`/weather?q=${encodeURIComponent(q)}`)
    let data = await response.json()
    return data
}

function createForecast() {
    for (let index = 0; index < 7; index++) {
        let dayContainer = document.createElement('div')
        dayContainer.id = `day-container${index}` //different id for each day so they can be edited later
        dayContainer.classList.add('day-container') //same class used for each day for styling purposes
        forecast.appendChild(dayContainer)

        let date = document.createElement('p')
        date.id = `date${index}`
        date.classList.add('day-info')
        dayContainer.appendChild(date)

        let lowTemp = document.createElement('p')
        let highTemp = document.createElement('p')
        lowTemp.id = `low-temp${index}`
        highTemp.id = `high-temp${index}`
        lowTemp.classList.add('day-info')
        highTemp.classList.add('day-info')
        dayContainer.appendChild(lowTemp)
        dayContainer.appendChild(highTemp)

        let condition = document.createElement('p')
        condition.id = `condition${index}`
        condition.classList.add('day-info')
        dayContainer.appendChild(condition)

        let conditionIcon = document.createElement('img')
        conditionIcon.id = `condition-icon${index}`
        conditionIcon.classList.add('condition-icon')
        dayContainer.appendChild(conditionIcon)
    }
}

async function newForecast(q) {
    let data = await getWeatherData(q)
    errorText = document.getElementById('error-text')
    
    if (data.error) {
        errorText.style.display = 'block'
        return;
    }
    errorText.style.display = 'none'

    document.getElementById('location').textContent = `${data.location.name}, ${data.location.region}, ${data.location.country}`
    document.getElementById('temp').textContent = `Current temp: ${data.current.temp_f}°F / ${data.current.temp_c}°C`
    document.getElementById('condition').textContent = data.current.condition.text
    document.getElementById('last-updated').textContent = `Last updated ${data.current.last_updated}`

    data.forecast.forecastday.forEach((day, index) => {
        document.getElementById(`date${index}`).textContent = day.date
        document.getElementById(`low-temp${index}`).textContent = `Low: ${day.day.mintemp_f}°F / ${day.day.mintemp_c}°C`
        document.getElementById(`high-temp${index}`).textContent = `High: ${day.day.maxtemp_f}°F / ${day.day.maxtemp_c}°C`
        document.getElementById(`condition${index}`).textContent = day.day.condition.text
        document.getElementById(`condition-icon${index}`).src = 'https:' + day.day.condition.icon
    })
}

window.addEventListener('DOMContentLoaded', () => {
    createForecast()
    newForecast('Birmingham')
})

cityForm.addEventListener('submit', (event) => {
    event.preventDefault()
    newForecast(cityInput.value)
})