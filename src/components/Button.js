import React from 'react'
import PropTypes from 'prop-types'
import {Button as SUButton} from 'semantic-ui-react'

const Button = ({children, onClick, className}) => {
  return (
    <SUButton className={className} onClick={onClick}>
      {children}
    </SUButton>
  )
}

Button.defaultProps = {
  children: null,
  className: 'primary'
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string
}

export default Button