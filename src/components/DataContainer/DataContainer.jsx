import React, { useEffect, useState} from 'react'

//https://api.covid19api.com/all)

import './data-container.css';

const DataContainer = () => {
    const [allCountries, setAllCountries] = useState([]);

    const [covidCountries, setCovidCountries] = useState([]);
    const [covidGlobal, setCovidGlobal] = useState([]);
    const [inputValues, setInputValues] = useState({
        country: '',
        select: 'noSort',
    });


    useEffect(() => {
        try {
            fetch('https://api.covid19api.com/summary')
            .then(resp => {
                return resp.json();
            })
            .then(data => {
                setCovidCountries(data.Countries);
                setCovidGlobal(data.Global);
                setAllCountries(data.Countries);
                console.log(allCountries);
            })

        } catch (err){
            console.error(err);
        }
        
    }, []);

    function handleInputChange(e){
        e.preventDefault();
        setInputValues((prevState) => {
            return {
                ...prevState, 
                [e.target.name]: e.target.value,
            }
        });
    }

    function filterCountries(e){
        if(e.target.value === ''){
            setCovidCountries(allCountries);
        }
        setCovidCountries(
            allCountries.filter((country) => country.Country.toLowerCase().includes(e.target.value.toLowerCase()))
        );
    }


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
            {covidCountries.map((country, i) => (
                <article className='app__countries-info_country' key={i}>
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
    <section className='app__data-container'>
        <div className="app__data-container_wrapper">
            <GlobalInfo />
            
            <div className="app__data-container_inputs">
            
                <div className="app__data-container_input">
                    <label htmlFor='country'>Filter countries by name:</label>
                    <input type="text" name='country' value={inputValues.country}
                        onChange={ (e) => {
                        handleInputChange(e);
                        filterCountries(e);}}
                    />
                </div>

                <div className="app__data-container_input">
                    <label htmlFor='select'>Sort countries by:</label>
                    <select value={inputValues.select} name='select' onChange={handleInputChange}>
                        <option value='noSort'>Choose Option</option>
                        <option value='totalConfirmed'>Total Confirmed</option>
                        <option value='totalDeaths'>Total Deaths</option>
                        <option value='newConfirmed'>New Confirmed</option>
                        <option value='newlDeaths'>New Deaths</option>
                    </select>
                </div>

            </div>
        </div>

        <CountriesInfo />
    </section>
  )
}

export default DataContainer