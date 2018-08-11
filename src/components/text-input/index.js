import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const _noop = () => {}

const config = {
  default: {
    background: 'transparent',
    border: '#D9D9D9',
    hoverBorder: '#B6C1CA',
    focusBorder: '#37474F',
    placeholder: '#B2B2B2'
  },
  readOnly: {
    background: '#F3F4F4',
    border: '#D9D9D9',
    hoverBorder: '#D9D9D9',
    focusBorder: '#D9D9D9',
    placeholder: '#333'
  }
}

const getColors = props => {
  if (props.readOnly) return config.readOnly
  return config.default
}

const getFloatedStyle = () => {
  const ty = '-70%'
  const tyBordered = '-110%'
  return css`
    font-size: 90%;
    opacity: 1;
    transform: ${props =>
      props.bordered
        ? `translate3d(0, ${tyBordered}, 0)`
        : `translate3d(0, ${ty}, 0)`};
  `
}

const StyledLabel = styled.div`
  position: absolute;
  color: #37474f;
  opacity: 0.3;
  bottom: 0;

  transition: all 0.25s;

  padding: 8px 4px 8px 0px;
  pointer-events: none;
  ${props => (props.readOnly ? getFloatedStyle(props) : null)};
`
const StyledInput = styled.input`
  width: 100%;
  height: 44px;
  box-sizing: border-box;
  background: ${props => getColors(props).background};

  border: 1px;
  border-style: ${props => (props.bordered ? 'solid' : 'none none solid none')};
  border-radius: ${props => (props.bordered ? '3px' : null)};
  border-color: ${props => getColors(props).border};

  font-size: inherit;
  color: #000000;
  opacity: ${props => (props.readOnly ? 0.3 : 1)};

  padding: 0;

  pointer-events: ${props => (props.readOnly ? 'none' : 'auto')};
  transition: border-color 0.25s, box-shadow 0.25s;

  &:hover {
    border-color: ${props => getColors(props).hoverBorder};
  }

  &:focus {
    border-color: ${props => getColors(props).focusBorder};
    ${props =>
      props.bordered
        ? css`
            box-shadow: 0px 0px 0 1px ${props => getColors(props).focusBorder};
          `
        : css`
            box-shadow: 0px 1px 0 0px ${props => getColors(props).focusBorder};
          `};
    outline: none;
    + ${StyledLabel} {
      ${props => getFloatedStyle(props)};
    }
  }

  &:valid {
    + ${StyledLabel} {
      ${props => getFloatedStyle(props)};
    }
  }

  &::-webkit-input-placeholder {
    transition: all 0.25s;
    color: ${props => getColors(props).placeholder};
    opacity: 1;
  }
`

const StyledTextInput = styled.div`
  position: relative;
  margin-top: ${props => (props.label ? '8px' : null)};
  margin-bottom: 16px;
`

class TextInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value || ''
    }
  }
  componentWillReceiveProps = nextProps => {
    if (nextProps.value !== this.state.value)
      this.setState({ value: nextProps.value })
  }
  onChange = e => {
    e.preventDefault()
    e.stopPropagation()
    const value = e.target.value
    if (this.props.value || this.props.value === '') {
      this.props.onChange(value)
    } else {
      this.setState({ value }, () => this.props.onChange(value))
    }
  }
  handleKeyPress = e => {
    if (e.keyCode === 13 && e.target.value) {
      const value = e.target.value
      e.preventDefault()
      e.stopPropagation()
      this.props.onAddItem(value)
    }
  }
  render() {
    const { defaultValue, ...props } = this.props
    if (props.label) {
      const { placeholder, ...rest } = props
      return (
        <StyledTextInput {...rest}>
          <StyledInput
            {...rest}
            onChange={this.onChange}
            value={this.state.value}
            onKeyUp={this.handleKeyPress}
            required
          />
          <StyledLabel {...rest}>{rest.label}</StyledLabel>
        </StyledTextInput>
      )
    } else {
      return (
        <StyledTextInput {...props}>
          <StyledInput
            {...props}
            onChange={this.onChange}
            value={this.state.value}
            onKeyPress={this.handleKeyPress}
            required
          />
        </StyledTextInput>
      )
    }
  }
}

TextInput.propTypes = {
  bordered: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string
}

TextInput.defaultProps = {
  bordered: false,
  readOnly: false,
  onChange: _noop
}

export default TextInput
