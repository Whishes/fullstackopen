import React, { useState, useEffect } from 'react'
import Country from "./components/Country"
import axios from 'axios'



function App() {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')
  const [countryFilter, setCountryFilter] = useState(countries)

  useEffect(() => {
          //console.log('effect')
    axios
      .get("https://restcountries.eu/rest/v2/all")
              .then((response) => {
                 // console.log('promise fulfilled')
                  setCountries(response.data)
          })
      }, [])
      //console.log('render', countries.length, 'countries')
      
  const handleFilter = (event) => {
    setSearchCountry(event.target.value)
    const searched = countries.filter((country) => country.name.toUpperCase().search(event.target.value.toUpperCase()) !== -1
    )
    setCountryFilter(searched)
  }

  
  return (
    <div>
      <h2>Filter Countries</h2>
      <p>
        Find countries <input value={searchCountry} onChange={handleFilter} />
      </p>
      <h2>Displayed Countries</h2>
      {countryFilter.length > 10
      ? <p>Too many matches, be more specific</p> 
      : <Country countryFilter={countryFilter} />}
    </div>
  );
}

export default App;
