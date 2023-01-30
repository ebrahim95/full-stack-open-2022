import { useState } from 'react'
import WeatherData from './WeatherData'


const CountryData = ({country}) => {
    
    const languages = Object.values(country.languages)
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p> capital {country.capital}
                <br />
                area {country.area}
            </p>

            <h3>languages: </h3>
            <ul>
                {languages.map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} />
            <WeatherData country={country} />
        </div>
    )
}

const Countries = ({ country, filteredCountries }) => {
    const [ show, setShow ] = useState(false)
    const viewDetails = () => {
        setShow(!show)
    }


    if (filteredCountries.length === 1) {
        return <div><CountryData country={filteredCountries[0]} /></div>
    }

    return (
        <div>
            <div key={country.name.official}>
                    {country.name.common}{"    "}
                    <button onClick={viewDetails}>{show ? "Hide" : "View"}</button>
                    {show ? <CountryData country={country} /> : null}
            </div>
        </div>
    )
}

export default Countries