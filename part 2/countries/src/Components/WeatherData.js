import axios from 'axios'
import { useState, useEffect } from 'react'

const WeatherData = ({ country }) => {
    const [weather, setWeatherData] = useState([])

    useEffect(() => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`)
        .then(response => setWeatherData(response.data))
    }, [])

    return (
    <>
      { weather.main ? ( <div>
            <h3>Weather in {country.capital}</h3>
            <p>temperature {weather.main.temp} F</p>
            <img alt="weather code" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
            <p>wind speed {weather.wind.speed} mph</p>
        </div>) : null}
    </>
    )
    
}

export default WeatherData