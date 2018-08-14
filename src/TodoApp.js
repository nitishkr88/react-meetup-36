import React, { Component } from 'react'

import TodoList from './TodoList'
import { TextInput } from './components'

import { Consumer } from './App'

class TodoApp extends Component {
  render() {
    return (
      <Consumer>
        {({ todos, searchText, onSearch, onAddTodo }) => (
          <div>
            <div className="add-todo">
              <TextInput
                label="Add/Search Todo"
                value={searchText}
                onChange={onSearch}
                onAddItem={onAddTodo}
              />
            </div>
            <TodoList todos={todos} />
          </div>
        )}
      </Consumer>
    )
  }
}

export default TodoApp
