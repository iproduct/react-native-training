import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Todo, TodoStatus } from './todo.model';
import MOCK_TODOS from './mock-todos';
import TodoList from './TodoList';
import TodoInput from './TodoInput';
import TodoFilter from './TodoFilter';
import { TodosAPI } from './rest-api-client';
import TodoInputFunction from './TodoInputFunction';
import { Optional } from './shared-types';


export type FilterType = TodoStatus | undefined;

interface TodoAppState {
  todos: Todo[];
  editedTodo: Optional<Todo>,
  filter: FilterType;
  errors: string | undefined;
}

export interface TodoListener {
  (todo: Todo): void;
}

export interface FilterChangeListener {
  (filter: FilterType): void;
}

class TodoApp extends Component<{}, TodoAppState> {
  state: Readonly<TodoAppState> = {
    todos: [],
    editedTodo: undefined,
    filter: undefined,
    errors: undefined
  }

  constructor(props: {}) {
    super(props)
    this.handleUpdateTodo = this.handleUpdateTodo.bind(this);
  }

  async componentDidMount() {
    try {
      const allTodos = await TodosAPI.findAll();
      this.setState({ todos: allTodos, errors: undefined })
    } catch (err) {
      this.setState({ errors: err as string })
    }
  }

  handleUpdateTodo(todo: Todo) {
    this.setState(({ todos }) => ({
      todos: todos.map(td => td.id === todo.id ? todo : td)
    }))
  }

  handleDeleteTodo = async (todo: Todo) => {
    try {
      await TodosAPI.deleteById(todo.id);
      this.setState(({ todos }) => ({
        todos: todos.filter(td => td.id !== todo.id),
        errors: undefined
      }));
    } catch (err) {
      this.setState({ errors: err as string })
    }
  }

  handleCreateTodo = async (todo: Todo) => {
    try {
      if (todo.id) { //edit todo
        const updated = await TodosAPI.update(todo);
        this.setState(({ todos }) => ({
          todos: todos.map(td => td.id === updated.id ? updated : td),
          errors: undefined,
          editedTodo: undefined
        }))
      } else { // create todo
        const created = await TodosAPI.create(todo);
        this.setState(({ todos }) => ({
          todos: todos.concat(created),
          errors: undefined
        }));
      }
    } catch (err) {
      this.setState({ errors: err as string })
    }
  }

  handleEditTodo = (todo: Todo) => {
    this.setState({ editedTodo: todo });
  }

  handlefilterChange = (status: FilterType) => {
    this.setState({ filter: status })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>TODO Demo</h2>
          {this.state.errors && <div className="errors">{this.state.errors}</div>}
          <TodoInput key={this.state.editedTodo?.id} todo={this.state.editedTodo} onCreateTodo={this.handleCreateTodo} />
          <TodoFilter filter={this.state.filter} onFilterChange={this.handlefilterChange} />
          <TodoList
            todos={this.state.todos}
            filter={this.state.filter}
            onUpdate={this.handleUpdateTodo}
            onDelete={this.handleDeleteTodo}
            onEdit={this.handleEditTodo}
          />
        </header>
      </div>
    );
  }
}

export default TodoApp;
