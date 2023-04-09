import React from 'react'

import './custom-select.css';

const select = document.querySelector('.select__button');
const optionBox = document.querySelector('.options');
const options = [...document.querySelectorAll('.options .item')];

let activeOption = 0; // default should be 0

window.onclick = (e) => {
    if(!e.target.className.includes('select')){
        select.classList.remove('active');
        optionBox.classList.remove('active');
    } else{
        select.classList.toggle('active');
        optionBox.classList.toggle('active');
    }
}

options.forEach((item, i) => {
    item.onmousemove = () => {
        hoverOptions(i);
    }
})

const hoverOptions = (i) => {
    options[activeOption].classList.remove('active');
    options[i].classList.add('active');
    activeOption = i;
    setValue();
}

window.onkeydown = (e) => {
    if(select.className.includes('active')){
        e.preventDefault();
        if(e.key === 'ArrowDown' && activeOption < options.length - 1){
            hoverOptions(activeOption + 1);
        } else if(e.key === 'ArrowUp' && activeOption > 0){
            hoverOptions(activeOption - 1);
        } else if(e.key === 'Enter'){
            select.classList.remove('active');
            optionBox.classList.remove('active');
        }
    }
}

const setValue = () => {
    select.innerHTML = select.value = options[activeOption].innerHTML;
}

setValue();

const CustomSelect = () => {
  return (
    <div class="select__container">
    <   button class="select__button" name="select" value="options">options</button>
        <div class="options">
            <p class="item active">option 1</p>
            <p class="item">option 2</p>
            <p class="item">option 3</p>
            <p class="item">option 4</p>
        </div>
    </div>
  )
}

export default CustomSelect