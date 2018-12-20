import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button as SUButton} from 'semantic-ui-react'

const classes = [
  'primary',
  'secondary',
  'inverse',
  'red',
  'green',
  'yellow',
  'pink',
]

class Button extends Component {
  state = {className: 'primary'}
  clickHandler = () => {
    const className = classes[Math.floor(Math.random() * 7) + 0]
    this.setState({className})
  }

  render() {
    const {children} = this.props
    const {className} = this.state
    return (
      <SUButton className={className} onClick={this.clickHandler}>
        {children}
      </SUButton>
    )
  }
}

Button.defaultProps = {
  children: null,
  className: 'primary',
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
}

export default Button
