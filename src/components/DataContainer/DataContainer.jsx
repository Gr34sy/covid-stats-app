import React, { useEffect, useState} from 'react'

//https://api.covid19api.com/all)

import './data-container.css';

const DataContainer = () => {

    const [covidCountries, setCovidCountries] = useState([]);
    const [covidGlobal, setCovidGlobal] = useState([]);

    useEffect(() => {
        try {

            fetch('https://api.covid19api.com/summary')
            .then(resp => {
                return resp.json();
            })
            .then(data => {
                setCovidCountries(data.Countries);
                setCovidGlobal(data.Global);
                console.log(data)
            })

        } catch (err){
            console.error(err);
        }
        
    }, [])

    const GlobalInfo = () => (
        <section className='app__global-info'>
            <h2 className='app__global-info_heading'>Global Stats</h2>
            <p className='app__info-line'> <span>Total Confirmed:</span>{covidGlobal.TotalConfirmed} </p>
            <p className='app__info-line'> <span>Total Deaths:</span>{covidGlobal.TotalDeaths} </p>

            <p className='app__info-line'> <span>New Confirmed:</span>{covidGlobal.NewConfirmed} </p>
            <p className='app__info-line'> <span>New Deaths:</span>{covidGlobal.NewDeaths} </p>
        </section>
    );

    const CountriesInfo = () => (
        <section className='app__countries-info'>
            {covidCountries.map(country => (
                <article className='app__countries-info_country'>
                    <h3 className="app__countries-info_country-heading">
                        {country.Country}
                    </h3>
                    <p className='app__info-line'> <span>Total Confirmed:</span>{country.TotalConfirmed} </p>
                    <p className='app__info-line'> <span>Total Deaths:</span>{country.TotalDeaths} </p>

                    <p className='app__info-line'> <span>New Confirmed:</span>{country.NewConfirmed} </p>
                    <p className='app__info-line'> <span>New Deaths:</span>{country.NewDeaths} </p> 


                </article>)
            )}
        </section>
    );

  return (
    <section className='app__data-container section-padding'>
        <GlobalInfo />
        <CountriesInfo />
    </section>
  )
}

export default DataContainer