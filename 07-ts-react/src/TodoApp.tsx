import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Todo, TodoStatus } from './todo.model';
import MOCK_TODOS from './mock-todos';
import TodoList from './TodoList';
import TodoInput from './TodoInput';
import TodoFilter from './TodoFilter';


export type FilterType = TodoStatus | undefined;

interface TodoAppState {
  todos: Todo[];
  filter: FilterType;
}

export interface TodoListener {
  (todo: Todo): void;
}

export interface FilterChangeListener {
  (filter: FilterType): void;
}

class TodoApp extends Component<{}, TodoAppState> {
  state: Readonly<TodoAppState> = {
    todos: MOCK_TODOS,
    filter: undefined
  }
  constructor(props: {}) {
    super(props)
    this.handleUpdateTodo = this.handleUpdateTodo.bind(this);
  }

  handleUpdateTodo(todo: Todo) {
    this.setState(({ todos }) => ({
      todos: todos.map(td => td.id === todo.id ? todo : td)
    }))
  }

  handleDeleteTodo = (todo: Todo) => {
    this.setState(({ todos }) => ({
      todos: todos.filter(td => td.id !== todo.id)
    }))
  }

  handleCreateTodo = (todo: Todo) => {
    this.setState(({ todos }) => ({
      todos: todos.concat(todo)
    }))
  }

  handlefilterChange = (status: FilterType ) => {
    this.setState({filter: status})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>TODO Demo</h2>
          <TodoInput onCreateTodo={this.handleCreateTodo} />
          <TodoFilter filter={this.state.filter} onFilterChange={this.handlefilterChange} />
          <TodoList
            todos={this.state.todos}
            filter={this.state.filter}
            onUpdate={this.handleUpdateTodo}
            onDelete={this.handleDeleteTodo}
          />
        </header>
      </div>
    );
  }
}

export default TodoApp;
