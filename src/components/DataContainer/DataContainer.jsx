import React, { useEffect, useState, useReducer} from 'react'

import CustomSelect from '../CustomSelect/CustomSelect';

//https://api.covid19api.com/all)

import './data-container.css';

const DataContainer = () => {
    const [textInputValue, setTextInputValue] = useState('');

    const [allCountries, setAllCountries] = useState([]);
    const [covidGlobal, setCovidGlobal] = useState([]);

    const [covidCountries, setCovidCountries] = useState([]);

    const [ignored, forceUpdate] = useReducer(x => x+1, 0);
    


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

    function handleTextInputChange(e){
        e.preventDefault();
        setTextInputValue(e.target.value);
    }

    function sortCountries(value){

        switch(value){
            case 'Alphabetical':
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

            case 'Total Confirmed': 
                setCovidCountries((prevState) => {
                    return prevState.sort((a, b) => {
                        return b.TotalConfirmed - a.TotalConfirmed;
                    });
                })
            break;

            case 'Total Deaths': 
                setCovidCountries((prevState) => {
                    return prevState.sort((a, b) => {
                        return b.TotalDeaths - a.TotalDeaths;
                    })
                })
            break;

            case 'New Confirmed': 
                setCovidCountries((prevState) => {
                    return prevState.sort((a, b) => {
                        return b.NewConfirmed - a.NewConfirmed;
                    })
                })
            break;

            case 'New Deaths': 
                setCovidCountries((prevState) => {
                    return prevState.sort((a, b) => {
                        return b.NewDeaths - a.NewDeaths;
                    })
                })
            break;
        }

        forceUpdate();

    }

    function filterCountries(e){
        if(e.target.value === ''){
            setCovidCountries([...allCountries]);
        }
        setCovidCountries(
            allCountries.filter((country) => country.Country.toLowerCase().includes(e.target.value.toLowerCase()))
        );
    }

    const CountriesInfo = () => (
        <section className='app__countries-info'>
            {covidCountries.map((country, i) => (
                <article className='app__countries-info_country' key={country+i}>
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
            <section className='app__global-info'>
                <h2 className='app__global-info_heading'>Global Stats</h2>

                <p className='app__info-line'> <span>Total Confirmed:</span>{covidGlobal.TotalConfirmed} </p>
                <p className='app__info-line'> <span>Total Deaths:</span>{covidGlobal.TotalDeaths} </p>
                <p className='app__info-line'> <span>New Confirmed:</span>{covidGlobal.NewConfirmed} </p>
                <p className='app__info-line'> <span>New Deaths:</span>{covidGlobal.NewDeaths} </p>
            </section>
            
            <div className="app__data-container_inputs">
            
                <div className="app__input-box">
                    <label htmlFor='country'>Filter countries by name:</label>
                    <input className="custom__input" type="text" name='country' value={textInputValue}
                        onChange={ (e) => {
                        handleTextInputChange(e);
                        filterCountries(e);}}
                    />
                </div>

                <div className="app__input-box">
                    <label htmlFor='select'>Sort countries:</label>
                    <CustomSelect handleChange={sortCountries} />
                </div>
            </div>
        </div>

        <CountriesInfo />
    </section>
  )
}

export default DataContainer