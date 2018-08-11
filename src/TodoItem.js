import React from 'react'
import PropTypes from 'prop-types'

import { Checkbox } from './components'

import { Consumer } from './App'

const TodoItem = props => {
  return (
    <Consumer>
      {({ onToggle }) => (
        <Checkbox
          selected={props.done}
          label={props.label}
          onToggle={v => onToggle(props.id, v)}
        />
      )}
    </Consumer>
  )
}

TodoItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  done: PropTypes.bool
}

TodoItem.defaultProps = {
  done: false
}

export default TodoItem
