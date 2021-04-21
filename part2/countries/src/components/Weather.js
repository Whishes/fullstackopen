import React, {useState, useEffect} from 'react'
import axios from 'axios'


const api_key = `${process.env.REACT_APP_API_KEY}`

const Weather = ({ country: {capital} }) => {
    const [weather, setWeather] = useState([])

    useEffect(() => {
    axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
    )
        .then((response) => {
            setWeather(response.data.current)
        })
    }, [capital])

    return (
        <div>
            <h3>Weather in {capital}</h3>
            <p>Temperature in city is {weather.temperature}</p>
            <img src={weather.weather_icons} alt={capital}></img>
            <p>Wind is {weather.wind_speed}km {weather.wind_dir}</p>
        </div>
    )
}

export default Weather
