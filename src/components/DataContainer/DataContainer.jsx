import React, { useEffect, useState} from 'react'

import CustomSelect from '../CustomSelect/CustomSelect';

//https://api.covid19api.com/all)

import './data-container.css';

const DataContainer = () => {
    const [allCountries, setAllCountries] = useState([]);

    const [covidCountries, setCovidCountries] = useState([]);
    const [covidGlobal, setCovidGlobal] = useState([]);
    const [inputValues, setInputValues] = useState({
        country: '',
        select: 'alphabetical',
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
                console.log(data.Countries);
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

    function sortCountries(e){
        switch(e.target.value){
            case 'alphabetical':
                setCovidCountries((prevState) => {
                    return prevState.sort((a, b) => {
                        if (a.Country < b.Country) {
                            return -1;
                        }
                        if (a.Country > b.Country) {
                            return 1;
                        }
                        return 0;
                    })
                })
            break;

            case 'totalConfirmed': 
                setCovidCountries((prevState) => {
                    return prevState.sort((a, b) => {
                        return b.TotalConfirmed - a.TotalConfirmed;
                    })
                })
            break;

            case 'totalDeaths': 
                setCovidCountries((prevState) => {
                    return prevState.sort((a, b) => {
                        return b.TotalDeaths - a.TotalDeaths;
                    })
                })
            break;

            case 'newConfirmed': 
                setCovidCountries((prevState) => {
                    return prevState.sort((a, b) => {
                        return b.NewConfirmed - a.NewConfirmed;
                    })
                })
            break;

            case 'newDeaths': 
                setCovidCountries((prevState) => {
                    return prevState.sort((a, b) => {
                        return b.NewDeaths - a.NewDeaths;
                    })
                })
            break;
        }
    }

    function filterCountries(e){
        if(e.target.value === ''){
            setCovidCountries([...allCountries]);
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
    <section className='app__data-container' id="data-container">
        <div className="app__data-container_wrapper">
            <GlobalInfo />
            
            <div className="app__data-container_inputs">
            
                <div className="app__input-box">
                    <label htmlFor='country'>Filter countries by name:</label>
                    <input className="custom__input" type="text" name='country' value={inputValues.country}
                        onChange={ (e) => {
                        handleInputChange(e);
                        filterCountries(e);}}
                    />
                </div>

                <div className="app__input-box">
                    <label htmlFor='select'>Sort countries:</label>
                    {/* <select className="custom__input" value={inputValues.select} name='select' onChange={(e) => {
                        handleInputChange(e);
                        sortCountries(e)}}
                    >
                        <option value='alphabetical'>Alphabetical</option>
                        <option value='totalConfirmed'>Total Confirmed</option>
                        <option value='totalDeaths'>Total Deaths</option>
                        <option value='newConfirmed'>New Confirmed</option>
                        <option value='newDeaths'>New Deaths</option>
                    </select> */}

                    <CustomSelect/>
                </div>

            </div>
        </div>

        <CountriesInfo />
    </section>
  )
}

export default DataContainer