import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom' // npm i react-router-dom

const Header = (props) => {
  const { branding } = props
  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0'>
      <div className='container'>
        <Link to='/' className='navbar-brand'>
        {branding}
        </Link>
        <div>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item active'>
              <Link to='/' className='nav-link'>
              <i className='fas fa-home-heart' /> Home
              </Link>
            </li>
            <li className='nav-item active'>
              <Link to='/contact/add' className='nav-link'>
              <i className='fas fa-plus-circle' /> Add
              </Link>
            </li>
            <li className='nav-item active'>
              <Link to='/about' className='nav-link'>
              <i className='fas fa-question' /> About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

Header.propTypes = {
  // Here, we have one property 'branding' of object Proptypes of type string is required for this file
  branding: PropTypes.string.isRequired
}

export default Header
