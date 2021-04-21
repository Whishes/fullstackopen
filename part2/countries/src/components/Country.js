import React, {useState, useEffect} from 'react'
import CountryData from './CountryData'

const Country = ({ countryFilter }) => {
    //console.log(countryFilter)
    const [showCountry, setShowCountry] = useState()

    useEffect(() => {
        if (countryFilter.length === 1) {
            setShowCountry(countryFilter[0])
        }
    }, [countryFilter])

    const listCountries = countryFilter.map((country) => (
        <div key={country.name}>
            {country.name}
            <button onClick={() => setShowCountry(country)}>Show</button>
        </div>
    ))


    return (
    <div>
        {countryFilter.length > 1 && listCountries}
        {showCountry && <CountryData country={showCountry} />}
    </div>
    )
}

export default Country