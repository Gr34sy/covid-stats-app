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
            <p className='app__global-info_line'> <span>Total Confirmed:</span>{covidGlobal.TotalConfirmed} </p>
            <p className='app__global-info_line'> <span>Total Deaths:</span>{covidGlobal.TotalDeaths} </p>

            <p className='app__global-info_line'> <span>New Confirmed:</span>{covidGlobal.NewConfirmed} </p>
            <p className='app__global-info_line'> <span>New Deaths:</span>{covidGlobal.NewDeaths} </p>
        </section>
    );

  return (
    <section className='app__data-container'>
        <GlobalInfo />
    </section>
  )
}

export default DataContainer