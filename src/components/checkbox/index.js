import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const width = '18px'
const height = '18px'

const StyledCheckbox = styled.span`
  display: inline-block;
  vertical-align: middle;
  height: ${height};
  position: relative;
  cursor: pointer;
  margin: 8px 0;
`

const Checkmark = styled.span`
  display: inline-block;
  position: relative;
  height: ${height};
  width: ${width};
  background-color: #ffffff;

  border: 1px solid #37474f;
  border-radius: 2px;

  &:hover {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);
  }

  &:after {
    content: '';
    position: absolute;
    display: none;

    left: 6px;
    top: 3px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`

const Box = styled.input`
  width: 0;
  opacity: 0;
  position: absolute;
  user-select: none;

  &:checked + ${Checkmark} {
    background-color: #37474f;
    &:after {
      display: block;
    }
  }
`

const Label = styled.label`
  vertical-align: top;
  line-height: 21px;
  font-size: 13px;
  letter-spacing: 1px;
  color: #757575;
  padding-left: 8px;
`

class Checkbox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: props.selected
    }
  }
  onToggle = () => {
    if (this.props.readOnly) return
    this.setState(currentState => {
      this.props.onToggle(!currentState.selected)
      return { selected: !currentState.selected }
    })
  }
  componentWillReceiveProps = nextProps => {
    if (nextProps.selected !== this.state.selected)
      this.setState({ selected: nextProps.selected })
  }
  render() {
    return (
      <StyledCheckbox onClick={this.onToggle}>
        <Box
          type="checkbox"
          checked={this.state.selected}
          readOnly={this.props.readOnly}
        />
        <Checkmark />
        <Label>{this.props.label}</Label>
      </StyledCheckbox>
    )
  }
}

Checkbox.propTypes = {
  selected: PropTypes.bool,
  label: PropTypes.string,
  readOnly: PropTypes.bool,
  onToggle: PropTypes.func
}

Checkbox.defaultProps = {
  selected: false,
  readOnly: false,
  onToggle: () => {}
}

export default Checkbox
