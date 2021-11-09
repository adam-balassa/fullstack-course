import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_KEY = process.env.REACT_APP_API_KEY

const FindCountries = ({value, onType}) => 
  <div>
    find countries: <input placeholder="country..." value={value} onChange={onType}/>
  </div>

const CityWeather = ({city}) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`)
      .then(result => setWeather(result.data))
  }, [city])

  if (weather.current)
    return <div>
      <h3>Weather in {city}</h3>
      <div>
        <strong>Temperature:</strong> {weather.current.temperature} C°
        <figure>
          <img src={weather.current.weather_icons[0]} alt="weather" style={{maxWidth: '50px'}}/>
        </figure>
        <strong>Wind:</strong> {weather.current.wind_speed} mph, direction: {weather.current.wind_dir}
      </div>
    </div>
  return <></>
}

const CountryDetail = ({country}) => 
  <div>
    <h2>{country.name.common}</h2>
    <div>Capital: {country.capital[0]}</div>
    <div>Population: {country.population}</div>
    <div>
      <h3>Languages</h3>
      <ul>
        {Object.entries(country.languages).map(([_, value]) => 
          <li key={value}>{value}</li>
        )}
      </ul>
    </div>
    <figure>
      <img src={country.flags.svg} alt="flag" style={{maxWidth: '200px'}}/>
    </figure>
    <CityWeather city={country.capital[0]}/>
  </div>

const CountryListItem = ({country, isExpanded, onShow}) => {
  if (isExpanded)
    return <CountryDetail country={country}/>
  return <div>{country.name.common}<button onClick={onShow}>Show</button></div>
}

const CountryList = ({countries}) => {
  const [expanded, setExpanded] = useState([])

  return <div>
    {countries.map(country => <CountryListItem 
      key={country.cca2} 
      country={country} 
      onShow={() => setExpanded([...expanded, country.cca2])}
      isExpanded={expanded.includes(country.cca2)}/>)}
  </div>
  }

const Result = ({countries}) => {
  if (countries.length >= 10)
    return <div>Too many matches, specify another filter</div>
  else if (countries.length === 1)
    return <CountryDetail country={countries[0]}/>
  else
    return <CountryList countries={countries}/>
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(result => setCountries(result.data))
  }, [])

  const matchingCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  return <div>
    <FindCountries value={filter} onType={event => setFilter(event.target.value)}/>
    <Result countries={matchingCountries}/>
  </div>
}

export default App