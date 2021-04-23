import React from 'react'
import Weather from './Weather'

const CountryData = ({country}) => {
    //console.log(country)
    return (
        <div>
            <h3>{country.name}</h3>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>

            <h4>Languages of the Country</h4>
            <ul>
                {country.languages.map((language) => (
                    <li key={language.name}>{language.name}</li>
                ))}
            </ul>
            <img src={country.flag} alt={country.name} width="200px"></img>

            <Weather country={country}/>
        </div>
    )
}

export default CountryData
