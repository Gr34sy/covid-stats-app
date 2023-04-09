import React from 'react'

import './navbar.css'

const Navbar = () => {
  return (
    <nav className='app__nav'>
      <h1 className='app__nav-heading'>
        <a href="#data-container"><span>Covid</span> Stats</a>
      </h1>

      <a className='app__nav-link' href="https://heroic-quokka-3e69bf.netlify.app">
        Click to find out my other projects
      </a>
    </nav>
  )
}

export default Navbar