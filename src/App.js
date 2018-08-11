import React, { Component } from 'react'

import TodoApp from './TodoApp'

import './App.css'

const { Provider, Consumer } = React.createContext()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [
        { id: 0, name: 'make this work better', done: true },
        { id: 1, name: 'add TypeScript defs', done: false },
        { id: 2, name: 'show off to the world', done: false }
      ],
      searchText: ''
    }
  }

  onAddTodo = value => {
    const ids = this.state.todos.map(todo => todo.id)
    const newId = ids[ids.length - 1] + 1
    this.setState(currentState => ({
      ...currentState,
      todos: [...currentState.todos, { id: newId, name: value, done: false }],
      searchText: ''
    }))
  }

  onToggle = (id, done) => {
    const { todos } = this.state
    const _id = todos.findIndex(todo => todo.id === id)
    if (_id !== -1)
      this.setState({
        todos: [
          ...todos.slice(0, _id),
          { ...todos[_id], done },
          ...todos.slice(_id + 1, todos.length)
        ]
      })
  }

  onSearch = value => {
    this.setState({
      searchText: value
    })
  }

  render() {
    const { todos, searchText } = this.state
    const filteredTodos = todos.filter(todo => todo.name.includes(searchText))
    return (
      <div className="App">
        <Provider
          value={{
            todos: filteredTodos,
            searchText: searchText,
            onAddTodo: this.onAddTodo,
            onToggle: this.onToggle,
            onSearch: this.onSearch
          }}
        >
          <TodoApp />
        </Provider>
      </div>
    )
  }
}

export default App

export { Consumer }
