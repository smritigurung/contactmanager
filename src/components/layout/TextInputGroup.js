// This is going to be a stateless functional component and this is going to take in property like name, type, onChange, etc.
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames' // npm i classnames in the terminal

const TextInputGroup = ({label, name, value, placeholder, type, onChange, error}) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        className={classnames('form-control form-control-lg', {
                     'is-invalid': error
                   })}
        placeholder={placeholder}
        value={value}
        onChange={onChange} />
      {error && <div className='invalid-feedback'>
                  {error}
                </div>}
    </div>
  )
}

TextInputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
}

TextInputGroup.defaultProps = {
  type: 'text'
}

export default TextInputGroup
