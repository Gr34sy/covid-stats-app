import React, { useState, useEffect } from 'react'

import './custom-select.css';

const CustomSelect = () => {
    const [selectValue, setSelectValue] = useState('Alphabetical');

  
  function displayOptions(e){
    e.preventDefault();
    document.querySelector('.app__select-options').classList.toggle('active');
  }

  return (
    <div className="app__select-container">
        <button className="custom__input app__select-button" name="select" value={selectValue} onClick={(e) => displayOptions(e)}>
            {selectValue}
        </button>

        <div className="app__select-options" 
            onClick={(e) => {
                setSelectValue(e.target.dataset.value);
                document.querySelector('.app__select-options .item.active').classList.remove('active');
                e.target.classList.add('active');
            }}
        >
            <p className="item active" data-value="Alphabetical">Alphabetical</p>
            <p className="item" data-value='Total Confirmed'>Total Confirmed</p>
            <p className="item" data-value='Total Deaths'>Total Deaths</p>
            <p className="item" data-value='New Confirmed'>New Confirmed</p>
            <p className="item" data-value='New Deaths'>New Deaths</p>
        </div>
    </div>
  )
}

export default CustomSelect