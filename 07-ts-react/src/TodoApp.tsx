import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Todo, TodoStatus } from './todo.model';
import MOCK_TODOS from './mock-todos';
import TodoList from './TodoList';


export type FilterType = TodoStatus | undefined;

interface TodoAppState {
  todos: Todo[];
  filter: FilterType;
}

export interface TodoListener {
  (todo: Todo): void;
}

class TodoApp extends Component<{}, TodoAppState> {
  state: Readonly<TodoAppState> = {
    todos: MOCK_TODOS,
    filter: undefined
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>TODO Demo</h2>
          <TodoList 
          todos={this.state.todos} 
          filter={this.state.filter} 
          onChangeStatus={(todo)=>{}}
          onUpdate={(todo)=>{}}
          onDelete={(todo)=>{}}
          />
        </header>
      </div>
    );
  }
}

export default TodoApp;
