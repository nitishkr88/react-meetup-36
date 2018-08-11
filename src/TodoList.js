import React from 'react'
import PropTypes from 'prop-types'

import TodoItem from './TodoItem'

class TodoList extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {this.props.todos.map(todo => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            label={todo.name}
            done={todo.done}
          />
        ))}
      </div>
    )
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      done: PropTypes.bool
    })
  )
}

export default TodoList
